require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generate-text', async (req, res) => {
  const apiToken = process.env.API_TOKEN;
  const apiEndpoint = 'https://api-inference.huggingface.co/models/HuggingFaceH4/starchat-beta';

  try {
    const response = await axios.post(apiEndpoint, req.body, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.json({ generatedText: response.data[0]?.generated_text });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});