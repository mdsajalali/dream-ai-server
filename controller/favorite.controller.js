const Favorite = require("../model/favorite.modal");

const createFavorite = async (req, res) => {
  const userId = req.user._id;

  const { imageId } = req.body;
  const existingFavorite = await Favorite.findOne({
    image: imageId,
    user: userId,
  });

  if (existingFavorite) {
    return res.status(400).json({
      message: "This image is already in your favorites.",
    });
  }

  const favorite = await Favorite.create({
    user: userId,
    image: imageId,
  });

  return res.status(201).json({
    message: "Image added to favorites",
    data: favorite,
  });
};

const myFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const totalFavorites = await Favorite.countDocuments({ user: userId });

    const favorites = await Favorite.find({ user: userId })
      .populate("image user")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: favorites.length
        ? "Your favorite images have been retrieved successfully."
        : "You have no favorite images yet.",
      data: {
        favorites,
        totalPages: Math.ceil(totalFavorites / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const removeFromFavorite = async (req, res) => {
  const userId = req.user._id;

  const imageId = req.params.imageId;

  console.log(imageId, userId);

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
