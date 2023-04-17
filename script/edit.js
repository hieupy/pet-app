"use strict";
const submitBtn_edit = document.getElementById("submit-btn");
const form_edit = document.getElementById("container-form");

const idInput_edit = document.getElementById("input-id");
const nameInput_edit = document.getElementById("input-name");
const ageInput_edit = document.getElementById("input-age");
const typeInput_edit = document.getElementById("input-type");
const weightInput_edit = document.getElementById("input-weight");
const lengthInput_edit = document.getElementById("input-length");
const colorInput_edit = document.getElementById("input-color-1");
const breedInput_edit = document.getElementById("input-breed");
const vaccinatedInput_edit = document.getElementById("input-vaccinated");
const dewormedInput_edit = document.getElementById("input-dewormed");
const sterilizedInput_edit = document.getElementById("input-sterilized");

const sidebar = document.querySelector("#sidebar");

// Get data from Local Storage
const KEY = "petArr";
const petArr = getFromStorage(KEY);

const KEY_breed = "breedArr";
const breedArr = getFromStorage(KEY_breed);

// Function renderTableDataEdit
function renderTableDataEdit(petArr) {
  const tableBodyEl_edit = document.getElementById("tbody");

  tableBodyEl_edit.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row_edit = document.createElement("tr");

    const vaccinatedCheck = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const dewormedCheck = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const sterilizedCheck = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    row_edit.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].petName}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].petLength} cm</td>
    <td>${petArr[i].breed}</td>
    <td><i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i></td>
    <td><i class="${vaccinatedCheck}"></i></td>
    <td><i class="${dewormedCheck}"></i></td>
    <td><i class="${sterilizedCheck}"></i></td>
    <td>${petArr[i].date}</td>
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${petArr[i].id}')">Edit</button></td>`;

    tableBodyEl_edit.appendChild(row_edit);
  }
}

// Render Table data for editing
renderTableDataEdit(petArr);

// Function startEditPet
const startEditPet = function (petID) {
  const index_edit = petArr.findIndex((pet) => pet.id === petID);

  form_edit.classList.remove("hide");

  idInput_edit.value = petArr[index_edit].id;
  nameInput_edit.value = petArr[index_edit].petName;
  ageInput_edit.value = petArr[index_edit].age;
  typeInput_edit.value = petArr[index_edit].type;
  lengthInput_edit.value = petArr[index_edit].petLength;
  weightInput_edit.value = petArr[index_edit].weight;
  breedInput_edit.value = petArr[index_edit].breed;
  colorInput_edit.value = petArr[index_edit].color;
  vaccinatedInput_edit.checked = petArr[index_edit].vaccinated;
  dewormedInput_edit.checked = petArr[index_edit].dewormed;
  sterilizedInput_edit.checked = petArr[index_edit].sterilized;

  // Function filterBreed for Dog and Cat
  function filterBreedDog() {
    const breedArrDog = breedArr.filter((br) => br.type === "Dog");
    for (let i = 0; i < breedArrDog.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `<option>${breedArrDog[i].breedName}</option>`;
      breedInput_edit.appendChild(option);
    }
  }

  function filterBreedCat() {
    const breedArrCat = breedArr.filter((br) => br.type === "Cat");
    for (let i = 0; i < breedArrCat.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `<option>${breedArrCat[i].breedName}</option>`;
      breedInput_edit.appendChild(option);
    }
  }

  // Function renderBreed
  function renderBreed() {
    if (typeInput_edit.value === "Select Type") {
      breedInput_edit.innerHTML = "";
    } else if (typeInput_edit.value === "Dog") {
      breedInput_edit.innerHTML = "";
      filterBreedDog();
    } else if (typeInput_edit.value === "Cat") {
      breedInput_edit.innerHTML = "";
      filterBreedCat();
    }
  }

  // Render corresponding Breed options when Type Input is changed
  typeInput_edit.addEventListener("change", renderBreed);

  renderBreed();
};

// Add click event for Submit button
submitBtn_edit.addEventListener("click", function () {
  const data_edit = {
    id: idInput_edit.value,
    petName: nameInput_edit.value,
    type: typeInput_edit.value,
    color: colorInput_edit.value,
    breed: breedInput_edit.value,
    age: parseInt(ageInput_edit.value),
    weight: parseInt(weightInput_edit.value),
    petLength: parseInt(lengthInput_edit.value),
    vaccinated: vaccinatedInput_edit.checked,
    dewormed: dewormedInput_edit.checked,
    sterilized: sterilizedInput_edit.checked,
    date: new Date().toLocaleDateString("en-GB", { hour12: false }),
  };

  // Validate edited data before Submission
  function validateDataEdit(data) {
    if (
      data_edit.id === "" ||
      data_edit.petName === "" ||
      isNaN(data_edit.age) ||
      isNaN(data_edit.weight) ||
      isNaN(data_edit.petLength)
    ) {
      alert(
        "Missing data, please ensure that you have filled the Pet ID, Pet Name, Age, Weight and Length!"
      );
      return false;
    } else if (data_edit.age < 1 || data_edit.age > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (data_edit.weight < 1 || data_edit.weight > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (data_edit.petLength < 1 || data_edit.petLength > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (data_edit.type === "Select Type") {
      alert("Please select Type!");
      return false;
    } else if (data_edit.breed === "Select Breed") {
      alert("Please select Breed!");
      return false;
    } else {
      return true;
    }
  }

  const validate_edit = validateDataEdit(data_edit);

  if (validate_edit) {
    const index_dataEdit = petArr.findIndex((pet) => pet.id === data_edit.id);
    petArr.splice(index_dataEdit, 1, data_edit);

    // Update Local Storage
    saveToStorage(KEY, petArr);

    form_edit.classList.add("hide");

    // Re-render table
    renderTableDataEdit(petArr);
  }
});

// Add animation for sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
