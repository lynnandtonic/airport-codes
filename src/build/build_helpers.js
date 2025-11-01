import fs from "node:fs";
import path from "node:path";
import pug from "pug";
import stylus from "stylus";
import { minify_sync } from "terser";
import readAllDataJson from "./read_all_data.js";

const airportData = readAllDataJson();

const VIEWS_DIR = path.join(import.meta.dirname, "..", "views");
const ASSETS_DIR = path.join(import.meta.dirname, "..", "..", "assets");
const JS_DIR = path.join(import.meta.dirname, "..", "js");

function renderPug(inputFile, extraData = {}) {
  const data = fs.readFileSync(inputFile, "utf8");
  return pug.render(data, { data: extraData });
}

export function render404Page() {
  return renderPug(path.join(VIEWS_DIR, "404.pug"));
}

export function renderContributePage() {
  return renderPug(path.join(VIEWS_DIR, "contribute.pug"));
}

export function renderAboutPage() {
  const airportCount = new Set(Object.keys(airportData)).size;
  const countryCount = new Set(
    Object.values(airportData).map((airport) => airport.country),
  ).size;
  const photographerCount = new Set(
    Object.values(airportData).map((airport) => airport.imageCredit),
  ).size;
  return renderPug(path.join(VIEWS_DIR, "about.pug"), {
    airportCount,
    countryCount,
    photographerCount,
  });
}

export function renderHomePage() {
  return new Promise((resolve, reject) => {
    const inlineCssPromise = renderStylusFile("home.styl");
    inlineCssPromise.then((inlineCss) => {
      resolve(
        renderPug(path.join(VIEWS_DIR, "index.pug"), {
          airportData,
          inlineCss,
        }),
      );
    });
  });
}

export function renderAirportPage(code) {
  return renderPug(path.join(VIEWS_DIR, "airport.pug"), {
    ...airportData[code],
    allAirportCodes: Object.keys(airportData),
  });
}

export function renderStylusFile(filename) {
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(path.join(ASSETS_DIR, filename), "utf8");
    return stylus(data)
      .set("filename", filename)
      .set("compress", true)
      .set("paths", [
        ASSETS_DIR,
        path.join(ASSETS_DIR, "components"),
        path.join(ASSETS_DIR, "globals"),
      ])
      .render(function render(err, text) {
        if (err) {
          reject(err);
        } else {
          resolve(text);
        }
      });
  });
}

export function renderJsFile(filename) {
  let data = fs.readFileSync(path.join(JS_DIR, filename), "utf8");

  const keys = [
    "id",
    "name",
    "nameEnglish",
    "city",
    "city2",
    "state",
    "stateShort",
    "country",
  ];

  const searchData = Object.values(airportData).map((it) => {
    return keys.map((key) => (it[key] || "").toLowerCase()).filter(Boolean);
  });

  data = data.replaceAll(
    "process.env.VAR_SEARCH_DATA",
    JSON.stringify(searchData),
  );

  const output = minify_sync(data, {
    compress: true,
    ecma: 2020,
    mangle: true,
  });
  return output.code;
}
