import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export default function readAllDataJson() {
  const result = {};

  const directory = path.join(import.meta.dirname, "..", "..", "data");

  // Read all files in directory
  const files = fs.readdirSync(directory);

  // Filter for .json files
  const jsonFiles = files.filter((file) => path.extname(file) === ".json");

  // Read each JSON file and index by id
  jsonFiles.forEach((file) => {
    try {
      const filePath = path.join(directory, file);
      const data = fs.readFileSync(filePath, "utf8").trim();
      const json = JSON.parse(data);

      if (json.id) {
        result[json.id] = json;
      }
      if (json.description) {
        json.originalDescription = json.description;
        json.description = marked.parse(json.description);
      }
    } catch (e) {
      console.error(`Failed to parse ${file}`, e);
      throw e;
    }
  });

  return result;
}
