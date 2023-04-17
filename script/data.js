"use strict";
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const sidebar = document.querySelector("#sidebar");

const KEY = "petArr";
// Export Data
// Using function "saveAs" from file FileSaver.js
exportBtn.addEventListener("click", function saveStaticDataToFile() {
  let blob = new Blob([JSON.stringify(getFromStorage(KEY))], {
    type: "application/json",
  });
  saveAs(blob, "petArr.JSON");
});

// Import Data
let fileArr = [];
// Add imported data to fileArr
function onFileLoad(elementId, event) {
  fileArr = event.target.result;
}

function onChooseFile(event, onLoadFileHandler) {
  if (typeof window.FileReader !== "function")
    throw "The file API isn't supported on this browser.";
  let input = event.target;
  if (!input) throw "The browser does not properly implement the event object";
  if (!input.files)
    throw "This browser does not support the `files` property of the file input.";
  if (!input.files[0]) return undefined;
  let file = input.files[0];
  let fr = new FileReader();
  fr.onload = onLoadFileHandler;
  fr.readAsText(file);
}

// Add click event for Import button
importBtn.addEventListener("click", function () {
  const importedArr = JSON.parse(fileArr);

  // Update Local Storage
  saveToStorage(KEY, importedArr);
});
