const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./db/config");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const newsletterRoute = require('./routes/newsletter');
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const logger = require("./services/logger");

dotenv.config()

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Farming Assistant Backend API." });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(express.json());
app.use(morgan("tiny", { stream: logger.stream }));

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)
app.use("/api/subscribe", newsletterRoute);

const server = http.createServer(app);

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);

server.listen(port, () => {
  connectDB();
  const address = server.address();
  const bind = typeof address === "string" ? `pipe ${address}` : `port ${port}`;
  if (process.env.NODE_ENV === "production") {
    logger.info(`Production Server is running on ${bind}`);
  } else {
    logger.info(`Development Server is running on ${bind}`);
  }
});
