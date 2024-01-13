const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await generateImage(prompt);
    res.json(response.data);
  } catch (error) {
    console.error("Error from OpenAI API:", error.response.data);
    res.status(500).json({ message: "Error generating image" });
  }
});

async function generateImage(prompt) {
  try {
    const API_KEY = process.env.API_KEY;
    const url = "https://api.openai.com/v1/images/generations";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    };

    const data = {
      prompt,
      num_images: 1,
      size: "512x512",
      response_format: "url",
    };

    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}
