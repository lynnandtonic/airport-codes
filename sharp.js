#!/usr/bin/env node
/**
 *@flow
 *@format
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const formats = {
  card: {
    directory: path.join(__dirname, "assets", "images", "card"),
    transformer: input =>
      sharp(input)
        .jpeg()
        .resize(null, 220)
  },
  medium: {
    directory: path.join(__dirname, "assets", "images", "medium"),
    transformer: input =>
      sharp(input)
        .jpeg()
        .resize(900)
  },
  small: {
    directory: path.join(__dirname, "assets", "images", "small"),
    transformer: input =>
      sharp(input)
        .jpeg()
        .resize(500)
  }
};

function loadAllLargeImages() {
  const sourceDir = path.join(__dirname, "assets", "images", "large");
  const sourceFiles = fs
    .readdirSync(sourceDir)
    .filter(
      filename =>
        filename.endsWith(".gif") ||
        filename.endsWith(".jpg") ||
        filename.endsWith(".jpeg") ||
        filename.endsWith(".png") ||
        filename.endsWith(".tiff") ||
        filename.endsWith(".webp")
    );
  return sourceFiles.map(sourceFile => path.join(sourceDir, sourceFile));
}

function processImages(sourceFiles) {
  let p = Promise.resolve();
  for (let i = 0; i < sourceFiles.length; i++) {
    const inputFile = sourceFiles[i];
    const promises = [];
    p = p.then(() => {
      for (const formatName in formats) {
        const format = formats[formatName];
        const sourceFile = path.basename(inputFile);
        const outputFile = path.join(format.directory, sourceFile);
        console.log("generating", outputFile);
        const processor = format.transformer(inputFile).toFile(outputFile);
        promises.push(processor);
      }
      return Promise.all(promises);
    });
  }
}

function streamToPromise(filename, stream) {
  return new Promise((resolve, reject) => {
    stream.on("finish", () => {
      console.log("finishing", filename);
      resolve();
    });
    stream.on("error", error => {
      console.log(filename, "failed!");
      console.log(error);
      reject();
    });
  });
}

if (process.argv.length > 2) {
  const images = process.argv.slice(2);
  processImages(images.map(image => path.join(__dirname, image)));
} else {
  processImages(loadAllLargeImages());
}
