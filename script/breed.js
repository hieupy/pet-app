"use strict";
const breedInput_breed = document.getElementById("input-breed");
const typeInput_bread = document.getElementById("input-type");
const submitBtn_breed = document.getElementById("submit-btn");

const sidebar = document.querySelector("#sidebar");

// Render Table with Breed data from Local Storage
const KEY_breed = "breedArr";
const breedArr = getFromStorage(KEY_breed);
renderTableDataBreed(breedArr);

// Add Breed
submitBtn_breed.addEventListener("click", function () {
  const data_breed = {
    breedName: breedInput_breed.value,
    type: typeInput_bread.value,
  };

  // Validate Breed data
  function validateDataBreed(data) {
    if (data_breed.breedName === "") {
      alert("Please input Breed!");
      return false;
    } else if (data_breed.type === "Select Type") {
      alert("Please select Type!");
      return false;
    } else {
      return true;
    }
  }

  const validate_breed = validateDataBreed(data_breed);

  // Check duplicated breed name
  function checkDuplicatedBreed(breed, breedArr) {
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breedName) {
        return false;
      }
    }
    return true;
  }

  const check_breed = checkDuplicatedBreed(breedInput_breed.value, breedArr);

  // Validate breed data and render breed table
  if (validate_breed && breedArr.length === 0) {
    breedArr.push(data_breed);
    clearInputBreed();
    renderTableDataBreed(breedArr);
  } else if (validate_breed && breedArr.length !== 0) {
    if (check_breed) {
      breedArr.push(data_breed);
      clearInputBreed();
      renderTableDataBreed(breedArr);
    } else {
      alert("This Breed already exists!");
    }
  }

  // Save to Local Storage
  saveToStorage(KEY_breed, breedArr);
});

// Function renderTableDataBreed
function renderTableDataBreed(breedArr) {
  const tableBodyEl_breed = document.getElementById("tbody");

  tableBodyEl_breed.innerHTML = "";

  for (let i = 0; i < breedArr.length; i++) {
    const row_breed = document.createElement("tr");

    row_breed.innerHTML = `
    <th scope="row">${i + 1}</th>
    <td>${breedArr[i].breedName}</td>
    <td>${breedArr[i].type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breedArr[i].breedName
    }')">Delete</button></td>`;

    tableBodyEl_breed.appendChild(row_breed);
  }
}

// Function clearInputBreed
const clearInputBreed = function () {
  breedInput_breed.value = "";
  typeInput_bread.value = "Select Type";
};

// Function deleteBreed:
function deleteBreed(breed) {
  if (confirm("Are you sure to delete this Breed?")) {
    const index_breed = breedArr.findIndex(function (br) {
      return breed === br.breedName;
    });

    breedArr.splice(index_breed, 1);
    renderTableDataBreed(breedArr);

    // Update Local Storage after deletion
    saveToStorage(KEY_breed, breedArr);
  }
}

// Add animation for sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
