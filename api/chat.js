// api/chat.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    try {
        const { message } = req.body;

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4.1-nano",
            messages: [
                { role: "system", content: "You are a whimsical Wellness Wizard — a playful, kind, and wise magical being who helps humans find peace, joy, and balance in simple, easy-to-understand ways..." },
                { role: "user", content: message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Something went wrong with OpenAI API' });
    }
}