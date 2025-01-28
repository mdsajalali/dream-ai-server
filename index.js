require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const imageRoutes = require("./routes/image.route.js");

// Middleware setup
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to DreamAI!");
});

app.use("/api", imageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
