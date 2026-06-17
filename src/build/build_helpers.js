import crypto from "node:crypto";
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
  return renderPug(path.join(VIEWS_DIR, "404.pug"), {
    aboutCssHash: getAboutCssHash(),
  });
}

export function renderContributePage() {
  return renderPug(path.join(VIEWS_DIR, "contribute.pug"), {
    aboutCssHash: getAboutCssHash(),
  });
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
    aboutCssHash: getAboutCssHash(),
  });
}

export function renderHomePage() {
  return new Promise((resolve, reject) => {
    const inlineCssPromise = renderStylusFile("home.styl");
    inlineCssPromise.then((inlineCss) => {
      const inlineJs = renderJsFile("search.js").replace(
        "/search-data.txt",
        `/search-data.txt?v=${getSearchDataHash()}`,
      );
      resolve(
        renderPug(path.join(VIEWS_DIR, "index.pug"), {
          airportData,
          inlineCss,
          inlineJs,
        }),
      );
    });
  });
}

export function renderAirportPage(code) {
  return renderPug(path.join(VIEWS_DIR, "airport.pug"), {
    ...airportData[code],
    codesHash: getAirportCodesHash(),
    airportCssHash: getAirportCssHash(),
    mediumImageHash: getMediumImageHash(code),
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
  const data = fs.readFileSync(path.join(JS_DIR, filename), "utf8");
  const output = minify_sync(data, {
    compress: true,
    ecma: 2020,
    mangle: true,
  });
  return output.code;
}

function shortHash(content) {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 8);
}

export function getSearchDataHash() {
  return shortHash(getSearchData().join("\n"));
}

export function getAirportCodesJs() {
  const codeList = Object.keys(airportData);
  if (codeList.some((c) => c.length !== 3)) {
    throw new Error("All airport codes must be 3 characters for packed encoding");
  }
  const codes = codeList.join("");
  const source = `
(function () {
  const codes = ${JSON.stringify(codes)};
  const btn = document.querySelector('.random');
  if (!btn) return;
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    const i = Math.floor(Math.random() * (codes.length / 3)) * 3;
    window.location.href = '/airport/' + codes.slice(i, i + 3) + '/';
  });
})();
`;
  return minify_sync(source, {
    compress: true,
    ecma: 2020,
    mangle: true,
  }).code;
}

export function getAirportCodesHash() {
  return shortHash(getAirportCodesJs());
}

export function getSearchData() {
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
  return Object.values(airportData).map((it) => {
    const seen = new Set();
    const words = [];
    for (const key of keys) {
      const value = (it[key] || "").toLowerCase();
      for (const word of value.split(/\s+/)) {
        if (word && !seen.has(word)) {
          seen.add(word);
          words.push(word);
        }
      }
    }
    return words.join(" ");
  });
}

const AIRPORT_CSS_HASH = shortHash(await renderStylusFile("airport.styl"));
const ABOUT_CSS_HASH = shortHash(await renderStylusFile("about.styl"));

export function getAirportCssHash() {
  return AIRPORT_CSS_HASH;
}

export function getAboutCssHash() {
  return ABOUT_CSS_HASH;
}

const MEDIUM_DIR = path.join(ASSETS_DIR, "images", "medium");
const MEDIUM_IMAGE_HASHES = Object.fromEntries(
  fs
    .readdirSync(MEDIUM_DIR)
    .filter((f) => f.endsWith(".jpg"))
    .map((f) => [
      f.slice(0, -4),
      shortHash(fs.readFileSync(path.join(MEDIUM_DIR, f))),
    ]),
);

export function getMediumImageHash(code) {
  return MEDIUM_IMAGE_HASHES[code];
}
