const router = require('express').Router();
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  generateTokenAndSetCookie,
} = require('../util/generateTokenAndSetCookie');
const {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
} = require('../mailtrap/emails');
const logger = require('../services/logger');

// Register
router.post('/register', async (req, res) => {
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET,
    ).toString(),
    verificationToken,
    verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  try {
    const savedUser = await newUser.save();

    generateTokenAndSetCookie(res, savedUser._id);

    await sendVerificationEmail(savedUser.email, verificationToken);

    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json('Wrong username!');
    }
    const hashedPass = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SECRET,
    );
    const originalPass = hashedPass.toString(CryptoJS.enc.Utf8);

    const inputPass = req.body.password;

    if (originalPass !== inputPass) {
      return res.status(401).json('Wrong password!');
    }
    generateTokenAndSetCookie(res, user._id);

    const { password, ...others } = user._doc;

    user.lastLogin = new Date();

    return res.status(200).json({ ...others });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/verify-email', async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification code',
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );

    return res
      .status(200)
      .json({
        success: true,
        message: 'Password reset link sent to your email',
      });
  } catch (error) {
    logger.error('Error in forgotPassword ', error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid or expired reset token' });
    }

    // update password
    const hashedPassword = await CryptoJS.AES.encrypt(
      password,
      process.env.PASS_SECRET,
    );

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    return res
      .status(200)
      .json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    logger.error('Error in resetPassword ', error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
});

router.get('/check-auth', async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    logger.error('Error in checkAuth ', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
