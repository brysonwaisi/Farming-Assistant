const express = require('express');
const { default: mongoose } = require('mongoose');
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('DB CONNECTION SUCCESSFUL'))
.catch((err) => {
  console.log(err)
});

app.use(express.json())
app.use("/api/users", userRoute)

app.listen(5000, () => {
  console.log(`Backend is running on ${port}`)
});