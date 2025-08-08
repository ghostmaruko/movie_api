const http = require("http"); // Import the http module
const fs = require("fs"); // Import the fs module for file system operations
const url = require("url"); // Import the url module for URL parsing
const path = require("path"); // Import the path module for handling file paths

const port = 8000; // Define the port number

http
  .createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true); // Parse the request URL
    const path = parsedUrl.pathname; // Get the pathname from the parsed URL

    // Logging request
    const logMessage = `${new Date().toISOString()} - ${path}\n`;
    fs.appendFile("log.txt", logMessage, (err) => {
      if (err) throw err;
    });

    if (path.includes("documentation")) {
      // Serve documentation.html
      fs.readFile("documentation.html", (err, data) => {
        if (err) {
          response.writeHead(500);
          response.end("Error loading documentation.html");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(data);
        }
      });
    } else {
      // Serve index.html
      fs.readFile("index.html", (err, data) => {
        if (err) {
          response.writeHead(500);
          response.end("Error loading index.html");
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.end(data);
        }
      });
    }
  })
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
