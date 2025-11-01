import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import readAllDataJson from "./build/read_all_data.js";
import {
  render404Page,
  renderAboutPage,
  renderAirportPage,
  renderContributePage,
  renderHomePage,
  renderJsFile,
  renderStylusFile,
} from "./build/build_helpers.js";

const PORT = 3000;
const ASSETS_DIR = path.join(import.meta.dirname, "..", "assets");

let airportData = {};

function renderError(stream, error, statusCode = 500) {
  console.log("got a 500 error", error);
  stream.statusCode = statusCode;
  stream.setHeader("Content-Type", "text/html");
  stream.end(`
    <!DOCTYPE html>
    <html>
      <head><title>Error</title></head>
      <body>
        <h1>Error</h1>
        <p><pre>${error.message}</pre></p>
      </body>
    </html>
  `);
}

function renderText(text, res, contentType) {
  try {
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Language", "en-US");
    res.setHeader("Content-Encoding", "gzip");
    zlib.gzip(text, function cb(error, compressed) {
      if (error) {
        renderError(res, error);
        return;
      }

      res.end(compressed);
    });
  } catch (renderErr) {
    renderError(res, renderErr);
  }
}

function renderImage(filename, res) {
  const filepath = path.join(ASSETS_DIR, "images", filename);
  const mimeTypeMapping = {
    ".avif": "image/avif",
    ".gif": "image/gif",
    ".jpg": "image/jpg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".svg&quot;": "image/svg+xml",
    ".webp": "image/webp",
  };

  const contentType = mimeTypeMapping[path.extname(filename)];
  if (!contentType) {
    throw new Error(`Unknown extension: ${path.extname(filename)}`);
  }

  // Check if file exists
  fs.readFile(filepath, (err, data) => {
    if (err) {
      renderError(res, err);
      return;
    }

    try {
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(data);
    } catch (renderErr) {
      renderError(res, renderErr);
      return;
    }
  });
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  airportData = readAllDataJson();

  // Parse the URL
  const url = req.url;

  const airportMatch = url.match(/^\/airport\/([^\/]+)\/$/);
  const cssMatch = url.match(/([^\/]+)\.css$/);
  const imageMatch = url.match(/images\/(.+)$/);
  const jsMatch = url.match(/js\/([^\/]+)\.js$/);

  // Route handling
  if (url === "/") {
    renderHomePage().then((text) => renderText(text, res, "text/html"));
  } else if (airportMatch) {
    const airportCode = airportMatch[1].toLowerCase();
    if (airportData[airportCode]) {
      renderText(renderAirportPage(airportCode), res, "text/html");
    } else {
      renderText(render404Page(), res, "text/html");
    }
  } else if (cssMatch) {
    const filename = cssMatch[1];
    renderStylusFile(filename + ".styl").then((text) =>
      renderText(text, res, "text/css"),
    );
  } else if (jsMatch) {
    const filename = jsMatch[1];
    renderText(renderJsFile(filename + ".js"), res, "application/javascript");
  } else if (imageMatch) {
    const imageFilename = imageMatch[1];
    renderImage(imageFilename, res);
  } else if (url === "/contribute/") {
    renderText(renderContributePage(), res, "text/html");
  } else if (url === "/about/") {
    renderText(renderAboutPage(), res, "text/html");
  } else {
    renderText(render404Page(), res, "text/html");
    return;
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/contribute/`);
  console.log(`  - http://localhost:${PORT}/about/`);
});
