// This script will handle communication with the ChatGPT API

// Function to generate email
function generateEmail(callback) {
  // Make a request to the ChatGPT API endpoint to generate the email
  // Replace `YOUR_API_KEY` with your actual ChatGPT API key
  fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    },
    body: JSON.stringify({
      prompt:
        "Hello, [Name]! I came across your profile on LinkedIn and wanted to connect...",
      max_tokens: 100,
      temperature: 0.7,
    }),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("API request failed. Status: " + response.status);
      }
      return response.json();
    })
    .then(function (data) {
      if (data.choices && data.choices.length > 0) {
        // Send the generated email back to the popup script
        callback({ email: data.choices[0].text });
      } else {
        throw new Error("No email generated.");
      }
    })
    .catch(function (error) {
      callback({ error: error.message });
    });
}

// Expose the generateEmail function to the popup script
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === "generateEmail") {
    port.onMessage.addListener(function (message) {
      if (message === "generate") {
        generateEmail(function (response) {
          port.postMessage(response);
        });
      }
    });
  }
});
