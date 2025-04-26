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
        const res = await fetch('/api/chat', {  // Change `../api/chat` to `/api/chat`
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await res.json();
        responseArea.innerHTML = data.reply;
    } catch (error) {
        console.error(error);
        responseArea.innerHTML = "Error contacting the server.";
    }
});