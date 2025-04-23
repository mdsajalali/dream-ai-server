# AI Text-Based Image Generator Backend

This backend powers an advanced AI-driven image generator, utilizing **Node.js**, **Express**, and **Mongoose**, with **Together AI** for text-to-image generation and **Cloudinary** for secure image storage and management.

## Features

- Secure user authentication and account management
- AI-powered image generation from text prompts via Together AI
- User-specific image gallery with organized collections
- Global image showcase for all generated images
- Favorite list functionality for easy access to preferred images
- Reliable image storage and management with Cloudinary
- Scalable and efficient database handling with Mongoose
- Admin dashboard for managing users, images, and roles

## Tech Stack

- **Node.js**: Fast and scalable JavaScript runtime
- **Express**: Lightweight and flexible web framework
- **Mongoose**: MongoDB object modeling and query handling
- **Cloudinary**: Secure image hosting
- **Together AI**: State-of-the-art AI model for text-to-image generation

## 💻 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/mdsajalali/dream-ai-server.git
```

2. Install dependencies:

```bash
cd dream-ai-server
npm install
```

3. Set up environment variables:

Create a **.env** file in the backend and add the following:

```env
TOGETHER_API_KEY=your_together_ai_api_key
TOGETHER_AI_MODEL=your_together_ai_modal
MONGO_URI=your_mongodb_connection_string
PORT=8080
SECRET_KEY=your_secret_key
cloud_name=your_cloudinary_cloud_name
api_key=your_cloudinary_api_key
api_secret=your_cloudinary_api_secret
FRONTEND_URL=your_frontend_url
```

4. Run the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:8080** 🚀

Check out the [Frontend Repository](https://github.com/mdsajalali/dream-ai-client).

Connect with me on [LinkedIn](https://www.linkedin.com/in/mdsajalali/).

Happy coding! 🚀
