const Favorite = require("../model/favorite.model");

const createFavorite = async (req, res) => {
  const { userId, imageId } = req.body;

  const existingFavorite = await Favorite.findOne({
    image: imageId,
    user: userId,
  });

  console.log(existingFavorite);

  if (existingFavorite) {
    return res.status(400).json({
      message: "This image is already in your favorites.",
    });
  }

  const favorite = new Favorite({
    user: userId,
    image: imageId,
  });

  await favorite.save();

  return res.status(201).json({
    message: "Image has been added to your favorites successfully.",
  });
};

const myFavorites = async (req, res) => {
  const userId = "679cb01b4f8e1a1a7919e1f7";

  const favorites = await Favorite.find({ user: userId })
    .populate("image")
    .sort("-createdAt");

  return res.status(200).json({
    message: favorites.length
      ? "Your favorite images have been retrieved successfully."
      : "You have no favorite images yet.",
    data: { favorites },
  });
};

const removeFromFavorite = async (req, res) => {
  const userId = "679cb01b4f8e1a1a7919e1f7";
  const imageId = req.params.imageId;

  const favorite = await Favorite.findOne({ user: userId, image: imageId });

  if (!favorite) {
    return res.status(404).json({
      message: "This image is not in your favorites.",
    });
  }

  await Favorite.findByIdAndDelete(favorite._id);

  return res.status(200).json({
    message: "The image has been successfully removed from your favorites.",
  });
};

module.exports = {
  createFavorite,
  myFavorites,
  removeFromFavorite,
};
