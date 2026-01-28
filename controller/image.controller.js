const { v2: cloudinary } = require("cloudinary");
const { default: Together } = require("together-ai");
const ImageModal = require("../model/image.model");
const apiKey = process.env.TOGETHER_API_KEY;
const togetherAIModel = process.env.TOGETHER_AI_MODEL;

const generateImage = async (req, res) => {
  try {
    const together = new Together({ apiKey });
    const { prompt, userId } = req.body;

    let response = await together.images.create({
      prompt,
      model: togetherAIModel,
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      response_format: "b64_json",
    });

    const base64Image = response?.data[0]?.b64_json;

    // Upload base64 image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      {
        folder: "ai-images",
      },
    );

    const imageUrl = uploadResponse.secure_url;

    // Save to DB
    const newImage = new ImageModal({ prompt, imageUrl, userId });
    await newImage.save();

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search?.trim();

    const filter = search ? { prompt: { $regex: search, $options: "i" } } : {};

    const totalImages = await ImageModal.countDocuments(filter);

    const images = await ImageModal.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      images,
      totalPages: Math.ceil(totalImages / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserImages = async (req, res) => {
  try {
    const { userId } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const totalImages = await ImageModal.countDocuments({ userId });

    const images = await ImageModal.find({ userId })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const data = {
      images,
      totalPages: Math.ceil(totalImages / limit),
      currentPage: page,
    };

    return res.status(200).json(data);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    await ImageModal.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  generateImage,
  getImages,
  getUserImages,
  deleteImage,
};
