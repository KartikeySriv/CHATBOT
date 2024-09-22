// Append message to the chat
function appendMessage(sender, message) {
    const chatContent = document.getElementById('chat-content');
    const messageElement = document.createElement('div');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight; // Auto-scroll to bottom
}

// Function to handle option selection
function selectOption(optionText) {
    appendMessage("user", optionText); // Display the selected option in the chat
    if (handleStaticResponse(optionText)) {
        // If static response is handled, do nothing
        return;
    } else {
        // Otherwise, fetch response from the API (not implemented here)
        fetchApiResponse(optionText);
    }
}

// Function to handle static responses
function handleStaticResponse(optionText) {
    let botResponse = "";
    let isStaticResponse = false;

    switch (optionText) {
        case "🌱 फसल की जानकारी":
            botResponse = "फसल की जानकारी के लिए कृपया अपना फसल का नाम बताएं।";
            appendMessage("bot", botResponse);
            displayCropOptions(); // Display crop options
            isStaticResponse = true;
            break;
        case "⛅ मौसम रिपोर्ट":
            botResponse = "आज का मौसम: धूप, 32°C। अधिक जानकारी के लिए कृपया मौसम ऐप देखें।";
            appendMessage("bot", botResponse);
            isStaticResponse = true;
            break;
        case "👨‍💻 साइट पर लॉगिन":
            botResponse = "साइट पर लॉगिन करने के लिए कृपया [लॉगिन लिंक] पर जाएं।";
            appendMessage("bot", botResponse);
            isStaticResponse = true;
            break;
        case "🤔 कुछ ओर":
            botResponse = "कृपया अपनी पूछताछ यहां दर्ज करें या हमें बताएं कि आप और क्या जानना चाहते हैं।";
            appendMessage("bot", botResponse);
            isStaticResponse = true;
            break;
    }

    return isStaticResponse;
}

// Function to display crop options
function displayCropOptions() {
    const cropButtonsContainer = document.createElement('div');
    cropButtonsContainer.classList.add('crop-buttons-container');

    const cropNames = ['गेहूँ', 'चावल', 'मक्‍का', 'बाजरा'];
    cropNames.forEach(cropName => {
        const cropButton = document.createElement('button');
        cropButton.classList.add('option-btn');
        cropButton.textContent = cropName;
        cropButton.addEventListener('click', () => {
            appendMessage("bot", `आपने ${cropName} का चयन किया है। कृपया अपनी पूछताछ दर्ज करें।`);
        });
        cropButtonsContainer.appendChild(cropButton);
    });

    const chatContent = document.getElementById('chat-content');
    chatContent.appendChild(cropButtonsContainer);
    chatContent.scrollTop = chatContent.scrollHeight; // Auto-scroll to bottom
}

// Initial event listeners
document.querySelectorAll('.option-btn').forEach(button => {
    button.addEventListener('click', () => {
        selectOption(button.textContent);
    });
});

// Placeholder for sending user input
document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim()) {
        appendMessage('user', userInput);
        document.getElementById('user-input').value = ''; // Clear input
        // Add API call or handling logic for user input if needed
    }
});