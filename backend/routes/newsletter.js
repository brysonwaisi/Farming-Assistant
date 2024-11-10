const router = require('express').Router();
const NewsletterSubscription = require('../models/Newsletter');
const logger = require('../services/logger');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    const newSubscription = new NewsletterSubscription({ email });
    await newSubscription.save();

    res.status(201).json({ message: 'Subscription successful' });
  } catch (error) {
    logger.error('Subscription failed:', error);
    res.status(500).json({ message: 'Subscription failed' });
  }
});

module.exports = router;
