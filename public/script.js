document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();
    const responseArea = document.getElementById('responseArea');
  
    if (!userInput) {
      responseArea.innerText = "Please type something!";
      return;
    }
  
    responseArea.innerText = "The Wizard is thinking... ✨";
  
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
      });
  
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
  
      const data = await res.json();
      const reply = data.reply;
  
      // Magical typing animation ✨
      responseArea.innerText = ""; // Clear thinking text
      let index = 0;
  
      function typeLetter() {
        if (index < reply.length) {
          responseArea.textContent += reply[index]; // <-- use textContent instead!
          index++;
          setTimeout(typeLetter, 30);
        } else {
          responseArea.classList.remove('glow');
        }
      }
  
      typeLetter();
  
    } catch (error) {
      console.error(error);
      responseArea.innerText = "Oops! The Wizard got lost in the stars. ✨";
    }
  });