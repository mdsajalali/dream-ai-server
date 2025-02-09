const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ImageModal = mongoose.model("Image", imageSchema);
module.exports = ImageModal;
