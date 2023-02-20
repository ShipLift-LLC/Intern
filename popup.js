// Get the input and output elements from the popup window
const input = document.getElementById("input");
const output = document.getElementById("output");

// Handle form submission
function handleSubmit(event) {
  event.preventDefault();

  // Get the user's input from the text input element
  const task = input.value;

  // Send the user's input to the background script for processing
  chrome.runtime.sendMessage({ type: "process-task", task }, (response) => {
    // Display the response from the background script in the output div
    output.innerText = response.message;
  });

  // Clear the text input element
  input.value = "";


  fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ task })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

}

// Add an event listener to the form submit button
document.getElementById("submit").addEventListener("click", handleSubmit);

function sendToDaemon(response) {
  fetch('http://localhost:3000/api/toast', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: response
  })
    .then(response => response.json())
    .then(data => {
      output.innerText += " " + data.message;
      console.log(data.message)
    })
    .catch(error => console.error(error));
}

// Handle form submission
function handleGetIntern(event) {
  event.preventDefault();

  output.innerText = event.target.id + " ";

  // Get the current tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Send a message to the content script
    chrome.tabs.sendMessage(tabs[0].id, { type: event.target.id }, (response) => {
      output.innerText += response;
      sendToDaemon(response);
    });
  });
}

// Add an event listener to the form submit button
document.getElementById("get-intern").addEventListener("click", handleGetIntern);
// Add an event listener to the form submit button
document.getElementById("get-title").addEventListener("click", handleGetIntern);


// Add an event listener for the onMessage event
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  // Log the message to the console
  console.log('Received message:', message);

  sendToDaemon(message);
  
  // Send a response back to the content script (if necessary)
  sendResponse({ success: true });
});
