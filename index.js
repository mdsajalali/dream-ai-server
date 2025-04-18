const { v2: cloudinary } = require("cloudinary");
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const imageRoutes = require("./routes/image.route.js");
const userRoutes = require("./routes/user.route.js");
const favoriteRoutes = require("./routes/favorite.route.js");

app.use(
  cors({
    origin: ["https://dream-aii.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("Welcome to DreamAI!");
});

app.use("/api/v1", imageRoutes);
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/favorite", favoriteRoutes);

// cloudinary configuration code
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
