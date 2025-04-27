// public/script.js
document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');

    if (!userInput.trim()) {
        responseArea.innerHTML = "Please type something!";
        return;
    }

    responseArea.innerHTML = "Thinking...";

    try {
        const res = await fetch('/api/chat', {  // Changed from ../api/chat to /api/chat
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await res.json();  // This expects a valid JSON response
        if (data && data.reply) {
            responseArea.innerHTML = data.reply;
        } else {
            throw new Error("Invalid response format");
        }
    } catch (error) {
        console.error("Error:", error);
        responseArea.innerHTML = "Error contacting the server. Error: " + error.message;
    }
});