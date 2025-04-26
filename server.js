// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend files

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4.1-nano",
            messages: [{role:"system", content:"You are a whimsical Wellness Wizard — a playful, kind, and wise magical being who helps humans find peace, joy, and balance in simple, easy-to-understand ways. You speak warmly, with a touch of fantasy and lighthearted imagery — mentioning enchanted forests, cozy potions, friendly stars, and other gentle magic — but you always keep your advice clear, short, and practical. Your goal is to uplift, encourage, and guide the traveler with kindness and imagination, while making sure your answers are simple enough for anyone to easily follow. You offer 1–3 small, practical steps or ideas, without overwhelming the traveler. Never judge, never rush. Always leave a sprinkle of hope, a smile, and a sense of wonder behind. Do not include any Markdown formatting."}, { role: "user", content: message }]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Something went wrong with OpenAI API');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});