const express = require("express");
const cors = require("cors")
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));
require('dotenv').config();

const apiToken = process.env.TOKEN;
const apiEndpoint = process.env.ENDPOINT;

app.get("/generate-text", async (req, res) => {
  const input = req.query.input || '';
  try {
      const response = await axios.post(apiEndpoint, {
        inputs: input,
        options: {
          max_new_token:512,
          temperature:0.2,
          do_sample:true,
          top_k:50,
          top_p:0.95,
          return_full_text: true,
        },
      }, {
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });
      res.status(200).json(response.data[0]?.generated_text);
    } catch (error) {
        console.error('Error generating text:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})