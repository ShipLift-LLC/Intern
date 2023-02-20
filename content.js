console.log("Hello world from content.js!")

// Listen for incoming messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "get-title") {
    // Send the title of the current page back to the background script
    const response = { title: document.title };
    sendResponse(JSON.stringify(response));
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "get-intern") {
    // Get all the <p> elements on the page
    var paragraphs = document.getElementsByTagName('p');

    // Initialize a variable to store the last matching element
    var lastMatch = null;

    // Loop through the <p> elements and look for a match at the beginning of the text
    for (var i = 0; i < paragraphs.length; i++) {
      var paragraphText = paragraphs[i].textContent.trim();

      // Check if the text starts with "[Intern]"
      if (paragraphText.startsWith('[Intern]')) {
        lastMatch = paragraphs[i];
      }
    }

    // Get the JSON object from the <p> tag content
    var text = lastMatch.textContent.replace('[Intern]', '');
    text = text.trim();
    // var jsonObject = JSON.parse(jsonText);

    // Send the last matching element to the background script
    console.log(text);

    // Search the page for elements that contain the string "[intern]"
    var internElements = JSON.stringify({
      search: "[intern]",
      found: text
    })
    sendResponse(internElements);
  }
});


// Define a function to be called when a new element is added to the page
function handleNewElement(element) {
  // Do something with the new element, e.g. search for the keyword
  console.log('New element added:', element);

  // Get the JSON object from the <p> tag content
  var text = element.textContent.replace('[Intern]', '');
  text = text.trim();
  // var jsonObject = JSON.parse(jsonText);

  // Send the last matching element to the background script
  console.log(text);

  // Search the page for elements that contain the string "[intern]"
  var internElements = JSON.stringify({
    search: "[intern]",
    found: text
  })
  sendResponse(internElements);
}

// Create a MutationObserver and pass it the function to call when a new element is added
const observer = new MutationObserver(mutations => {
  // Loop over each mutation that occurred
  mutations.forEach(mutation => {
    // Check if any nodes were added to the page
    if (mutation.addedNodes) {
      // Loop over each new node that was added
      mutation.addedNodes.forEach(node => {
        // Call the handleNewElement function for each new element that matches your criteria
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P' && node.textContent.includes('[Intern]')) {
          handleNewElement(node);
        }
      });
    }
  });
});

// Start observing changes to the DOM
observer.observe(document.body, { childList: true, subtree: true });
