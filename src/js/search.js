document.addEventListener("DOMContentLoaded", function () {
  const searchData = process.env.VAR_SEARCH_DATA;
  const search = document.getElementById("search");
  const clearButton = document.querySelector("button.clear");

  // Use the style element to control visibility
  const styleElement = document.createElement("style");
  document.head.appendChild(styleElement);

  clearButton.addEventListener("click", function clearButtonClicked() {
    search.value = "";
    styleElement.textContent = "";
    search.focus();
  });

  search?.addEventListener("keyup", function handleSearch() {
    const searchTerm = (search.value || "").trim().toLowerCase();

    const ids = [];
    for (const airport of searchData) {
      let shouldHide = true;
      for (const valueToTest of airport) {
        if (valueToTest.indexOf(searchTerm) > -1) {
          shouldHide = false;
          break;
        }
      }
      if (shouldHide) {
        ids.push(`#${airport[0]}`);
      }
    }

    styleElement.textContent = `${ids}{display:none!important;}`;
  });
});
