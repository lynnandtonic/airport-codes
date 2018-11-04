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

const sourceDir = path.join(__dirname, "assets", "images", "large");
const sourceFiles = fs.readdirSync(sourceDir);

function processImages() {
  let p = Promise.resolve();
  for (let i = 0; i < sourceFiles.length; i++) {
    const sourceFile = sourceFiles[i];
    const promises = [];
    p = p.then(() => {
      for (const formatName in formats) {
        const format = formats[formatName];
        const inputFile = path.join(sourceDir, sourceFile);
        const outputFile = path.join(format.directory, sourceFile);
        console.log("processing", outputFile);
        const processor = format
          .transformer(path.join(sourceDir, sourceFile))
          .toFile(outputFile);
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

processImages();
