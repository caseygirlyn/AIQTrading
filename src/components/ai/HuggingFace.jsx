const express = require('express');
const axios = require('axios');
const app = express();

app.get('/forecast', async (req, res) => {
    try {
        const response = await axios.post('https://api-inference.huggingface.co/models/FinGPT/fingpt-forecaster_dow30_llama2-7b_lora', {
            inputs: "Your input text here",
        }, {
            headers: { 'Authorization': 'Bearer your_huggingface_api_token' }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
