const search = document.getElementById("search");
const clearButton = document.querySelector("button.clear");
const styleElement = document.createElement("style");
document.head.appendChild(styleElement);

let searchData = null;
let loadPromise = null;

function applyFilter(rawValue) {
  const searchTerm = (rawValue || "").trim().toLowerCase();
  if (!searchTerm) {
    styleElement.textContent = "";
    return;
  }
  const ids = [];
  for (const line of searchData) {
    if (line.indexOf(searchTerm) === -1) {
      ids.push(`#${line.slice(0, 3)}`);
    }
  }
  styleElement.textContent = `${ids}{display:none!important;}`;
}

function loadData() {
  if (loadPromise) return loadPromise;
  loadPromise = fetch("/search-data.txt")
    .then((r) => r.text())
    .then((text) => {
      searchData = text.split("\n");
      if (search && search.value) applyFilter(search.value);
    })
    .catch(() => {
      loadPromise = null;
    });
  return loadPromise;
}

if ("requestIdleCallback" in window) {
  requestIdleCallback(loadData);
} else {
  setTimeout(loadData, 1000);
}

search?.addEventListener("focusin", loadData, { once: true });

clearButton?.addEventListener("click", function clearButtonClicked() {
  search.value = "";
  styleElement.textContent = "";
  search.focus();
});

search?.addEventListener("keyup", function handleSearch() {
  if (searchData) applyFilter(search.value);
});
