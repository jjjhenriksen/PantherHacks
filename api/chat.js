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
            model: "gpt-4.1-nano",  // Ensure this is a valid model ID
            messages: [
                { role: "system", content: "You are a whimsical Wellness Wizard — ..." },  // Truncated content for brevity
                { role: "user", content: message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Check if the response data is as expected
        if (response.data && response.data.choices && response.data.choices[0]) {
            res.status(200).json({ reply: response.data.choices[0].message.content });
        } else {
            throw new Error('Unexpected OpenAI API response structure');
        }
    } catch (error) {
        console.error("Error from OpenAI API:", error.response ? error.response.data : error.message);
        
        // Send a valid JSON response for error handling
        res.status(500).json({ message: 'Something went wrong with OpenAI API', error: error.message });
    }
}