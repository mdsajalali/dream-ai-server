const { v2: cloudinary } = require("cloudinary");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const imageRoutes = require("./routes/image.route.js");
const userRoutes = require("./routes/user.route.js");
const favoriteRoutes = require("./routes/favorite.route.js");

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options("*", cors(corsOptions));

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
