# Give ChatGPT Intern super powers

This is a simple proof-of-concept Chrome extension that allows you to make JSON API requests to a localhost server, triggered by a chromium extension's icon and choosing "Intern".

## Getting Started

1. Clone this repository to your local machine.
2. In your Chrome browser, go to `chrome://extensions/` and enable **Developer mode**.
3. Click **Load unpacked** and select the directory where you cloned the repository.
4. The extension should now be loaded and the icon should be visible on your browser's toolbar.

## Components

### manifest.json

This file contains metadata about the extension and its various components.

### popup.html

This is the HTML file that represents the popup when the user clicks on the extension icon. It contains a simple form to submit a message to the local server.

### popup.css

This file contains the styles for the `popup.html` file.

### popup.js

This file contains the event listener that is triggered when the user submits a message via the form in the `popup.html` file. It sends a JSON API request to a localhost server.

### background.js

This file contains the event listener that is triggered when the extension icon is clicked. It gets the current tab's title and URL, sends a JSON API request to a localhost server, and logs the response.

### content.js

This file contains the script that is executed on every page load. It looks for elements on the page that contain the keyword "[Intern]" and sends the text of the element to the `popup.js` script via a custom event.

### daemon.go

This is the Go program that listens on port 3000 for incoming JSON API requests and then transforms them into a desktop notification.

## Usage

1. Start the Go program by running `go run daemon.go` in a terminal window.
2. Load a webpage in your browser that contains an element with the keyword "[Intern]".
3. The `content.js` script will detect the element and send its text to the `popup.js` script via a custom event.
4. Click the extension icon to open the popup and submit a message to the local server. The server will respond with a JSON object that is logged to the browser console.

## Dependencies

* Go 1.16.5 or later
* Chromium-based browser

## Compatibility

This extension was developed and tested on Google Chrome version 96.0.4664.110 (Official Build) (64-bit) running on Pop!_OS 20.04 LTS.

## Authors

* **Andrew LeTourneau** - *Initial work* - [centerorbit](https://github.com/centerorbit)

## Acknowledgments

* [OpenAI](https://openai.com/) - for providing the language model that powers this chatbot
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - for providing excellent documentation on web technologies
