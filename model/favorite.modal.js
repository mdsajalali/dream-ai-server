const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true, versionKey: false }
);
favoriteSchema.index({ user: 1, image: 1 }, { unique: true });
const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
