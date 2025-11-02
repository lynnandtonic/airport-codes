import fs from "node:fs";
import path from "node:path";
import readAllDataJson from "./src/build/read_all_data.js";
import {
  render404Page,
  renderAboutPage,
  renderAirportPage,
  renderContributePage,
  renderHomePage,
  renderJsFile,
  renderStylusFile,
} from "./src/build/build_helpers.js";

const airportData = readAllDataJson();

const ASSETS_DIR = path.join(import.meta.dirname, "assets");
const JS_DIR = path.join(import.meta.dirname, "src", "js");
const OUTPUT_DIR = path.join(import.meta.dirname, "build");

function generateHtmlFiles(tuples) {
  for (const [renderFn, filename] of tuples) {
    const fullpath = path.join(OUTPUT_DIR, filename);
    try {
      fs.mkdirSync(path.dirname(fullpath), { recursive: true });
    } catch (e) {}
    const out = renderFn();
    if (out.then) {
      out.then((text) => {
        fs.writeFileSync(fullpath, text, { encoding: "utf-8" });
      });
    } else {
      fs.writeFileSync(fullpath, out, { encoding: "utf-8" });
    }
    
  }
}

generateHtmlFiles([
  [render404Page, "404.html"],
  [renderAboutPage, "about.html"],
  [renderContributePage, "contribute.html"],
  [renderHomePage, "index.html"],
  ...Object.values(airportData).map((it) => [
    () => renderAirportPage(it.id),
    `airport/${it.id}/index.html`,
  ]),
]);

async function generateCssFiles(filenames) {
  for (const filename of filenames) {
    const fullpath = path.join(OUTPUT_DIR, filename.replace(".styl", ".css"));
    try {
      fs.mkdirSync(path.dirname(fullpath), { recursive: true });
    } catch (e) {}
    fs.writeFileSync(fullpath, await renderStylusFile(filename), {
      encoding: "utf-8",
    });
  }
}

await generateCssFiles(
  fs.readdirSync(ASSETS_DIR).filter((file) => path.extname(file) === ".styl"),
);

function generateJsFiles(filenames) {
  for (const filename of filenames) {
    const fullpath = path.join(OUTPUT_DIR, "js", filename);
    try {
      fs.mkdirSync(path.dirname(fullpath), { recursive: true });
    } catch (e) {}
    fs.writeFileSync(fullpath, renderJsFile(filename), { encoding: "utf-8" });
  }
}

generateJsFiles(
  fs.readdirSync(JS_DIR).filter((file) => path.extname(file) === ".js"),
);
