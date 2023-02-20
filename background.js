// Listen for incoming messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "process-task") {
    // Perform some processing based on the user's input
    const response = {
      message: `You said: "${message.task}" - I'm working on it!`,
    };
    
    // Send the response back to the popup script
    sendResponse(response);
  }
});
