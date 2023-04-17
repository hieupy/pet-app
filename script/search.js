"use strict";
const idInput_find = document.getElementById("input-id");
const nameInput_find = document.getElementById("input-name");
const typeInput_find = document.getElementById("input-type");
const breedInput_find = document.getElementById("input-breed");
const vaccinatedInput_find = document.getElementById("input-vaccinated");
const dewormedInput_find = document.getElementById("input-dewormed");
const sterilizedInput_find = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const sidebar = document.querySelector("#sidebar");

const KEY = "petArr";
const petArr = getFromStorage(KEY);

const KEY_breed = "breedArr";
const breedArr = getFromStorage(KEY_breed);

// Add Click event for Find Button
findBtn.addEventListener("click", function () {
  const data_find = {
    id: idInput_find.value,
    petName: nameInput_find.value,
    type: typeInput_find.value,
    breed: breedInput_find.value,
    vaccinated: vaccinatedInput_find.checked,
    dewormed: dewormedInput_find.checked,
    sterilized: sterilizedInput_find.checked,
  };

  // Create findResult array to store filtered data from petArr
  let findResult = [];

  if (idInput_find.value.toLowerCase() !== "") {
    findResult = petArr.filter((pet) =>
      pet.id.toLowerCase().includes(idInput_find.value.toLowerCase())
    );
  }

  if (nameInput_find.value.toLowerCase() !== "") {
    findResult = petArr.filter((pet) =>
      pet.petName.toLowerCase().includes(nameInput_find.value.toLowerCase())
    );
  }

  if (
    typeInput_find.value !== "Select Type" &&
    breedInput_find.value !== "Select Breed"
  ) {
    findResult = petArr.filter((pet) => pet.breed === breedInput_find.value);
  }

  if (vaccinatedInput_find.checked === true) {
    findResult = petArr.filter(
      (pet) => pet.vaccinated === vaccinatedInput_find.checked
    );
  } else if (dewormedInput_find.checked === true) {
    findResult = petArr.filter(
      (pet) => pet.dewormed === dewormedInput_find.checked
    );
  } else if (sterilizedInput_find.checked === true) {
    findResult = petArr.filter(
      (pet) => pet.sterilized === sterilizedInput_find.checked
    );
  }

  renderTableDataFind(findResult);
});

// Function renderTableDataFind
function renderTableDataFind(petArr) {
  const tableBodyEl_find = document.getElementById("tbody");

  tableBodyEl_find.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row_find = document.createElement("tr");

    const vaccinatedCheck = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const dewormedCheck = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const sterilizedCheck = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    row_find.innerHTML = `
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
    <td>${petArr[i].date}</td>`;

    tableBodyEl_find.appendChild(row_find);
  }
}

// Function filterBreed for Dog and Cat
function filterBreedDog() {
  const breedArrDog = breedArr.filter((br) => br.type === "Dog");
  for (let i = 0; i < breedArrDog.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArrDog[i].breedName}</option>`;
    breedInput_find.appendChild(option);
  }
}

function filterBreedCat() {
  const breedArrCat = breedArr.filter((br) => br.type === "Cat");
  for (let i = 0; i < breedArrCat.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArrCat[i].breedName}</option>`;
    breedInput_find.appendChild(option);
  }
}

// Function renderBreed
function renderBreed() {
  if (typeInput_find.value === "Select Type") {
    breedInput_find.innerHTML = "";
  } else if (typeInput_find.value === "Dog") {
    breedInput_find.innerHTML = "";
    filterBreedDog();
  } else if (typeInput_find.value === "Cat") {
    breedInput_find.innerHTML = "";
    filterBreedCat();
  }
}

// Render corresponding Breed options when Type Input is changed
typeInput_find.addEventListener("change", renderBreed);
