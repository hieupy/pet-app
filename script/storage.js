"use strict";
// Function to save data to Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Function to get data from Local Storage
function getFromStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}
