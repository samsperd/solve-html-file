const express = require('express');
const bodyParser = require('body-parser');
const posthtml = require('posthtml');
const inlineAssets = require('posthtml-inline-assets');

const app = express();
const port = 5000;

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// API endpoint to process HTML content
app.post('/process-html', (req, res) => {
  console.log("received it here");
  // Get the HTML content from the request body
  const htmlContent = req.body.html;

  // Process the HTML content with PostHTML-Inline-Assets package
  posthtml()
    .use(inlineAssets())
    .process(htmlContent)
    .then((result) => {
      // Send back the output HTML as the API response
      res.send(result.html);
    })
    .catch((error) => {
      // In case of any errors, send an error response
      res.status(500).send('Error processing HTML content');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
