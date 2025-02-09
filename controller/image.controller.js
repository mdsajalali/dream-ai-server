const { default: Together } = require("together-ai");
const ImageModal = require("../model/image.model");
const { uploadBase64toImage } = require("../utils");
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

    // upload the base64 image to the storage
    const imageUrl = await uploadBase64toImage(base64Image);
    // Insert into the DB
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
    const limit = parseInt(req.query.limit) || 10;
    const totalImages = await ImageModal.countDocuments();

    const images = await ImageModal.find()
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
    return res.status(500).json({ error: error.message });
  }
};

const getUserImages = async (req, res) => {
  try {
    const { userId } = req.params;

    const images = await ImageModal.find({ userId });

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  generateImage,
  getImages,
  getUserImages,
};
