"use strict";
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const sidebar = document.querySelector("#sidebar");

// Render Table with Pet data from Local Storage
const KEY = "petArr";
const petArr = getFromStorage(KEY);
renderTableData(petArr);

// Add Click event for Submit Button
submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    petName: nameInput.value,
    type: typeInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    age: parseInt(ageInput.value), //parseInt convert string to integer
    weight: parseInt(weightInput.value),
    petLength: parseInt(lengthInput.value),
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date().toLocaleDateString("en-GB", { hour12: false }), //take the current Date value
  };

  // Validate Input data
  function validateData(data) {
    if (
      data.id === "" ||
      data.petName === "" ||
      isNaN(data.age) || // isNaN() method returns true if a value is NaN:
      isNaN(data.weight) ||
      isNaN(data.petLength)
    ) {
      alert(
        "Missing data, please ensure that you have filled the Pet ID, Pet Name, Age, Weight and Length!"
      );
      return false;
    } else if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      return false;
    } else if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      return false;
    } else if (data.petLength < 1 || data.petLength > 100) {
      alert("Length must be between 1 and 100!");
      return false;
    } else if (data.type === "Select Type") {
      alert("Please select Type!");
      return false;
    } else if (data.breed === "Select Breed") {
      alert("Please select Breed!");
      return false;
    } else {
      return true;
    }
  }

  const validate = validateData(data);

  // Create function to check duplicated Pet ID from Input data:
  function checkDuplicatedID(id, petArr) {
    for (let i = 0; i < petArr.length; i++) {
      if (id === petArr[i].id) {
        return false;
      }
    }

    return true;
  }

  const checkID = checkDuplicatedID(idInput.value, petArr);

  // Validate Input data and render table
  if (validate && petArr.length === 0) {
    petArr.push(data);
    clearInput();
    renderTableData(petArr);
  } else if (validate && petArr.length !== 0) {
    if (checkID) {
      petArr.push(data);
      clearInput();
      renderTableData(petArr);
    } else {
      alert("ID must be unique!");
    }
  }

  // Save Pet data to Local Storage
  saveToStorage(KEY, petArr);
});

// Create function to render Table of Pet data
function renderTableData(petArr) {
  const tableBodyEl = document.getElementById("tbody");

  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");

    const vaccinatedCheck = petArr[i].vaccinated
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const dewormedCheck = petArr[i].dewormed
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";
    const sterilizedCheck = petArr[i].sterilized
      ? "bi bi-check-circle-fill"
      : "bi bi-x-circle-fill";

    row.innerHTML = `
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
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">Delete</button></td>`;

    tableBodyEl.appendChild(row);
  }
}

// Create function to clear Input form after submission
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  ageInput.value = "";
  weightInput.value = "";
  lengthInput.value = "";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Create function to delete a Pet
function deletePet(petID) {
  if (confirm("Are you sure?")) {
    const index = petArr.findIndex(function (pet) {
      return petID === pet.id;
    });

    petArr.splice(index, 1);
    renderTableData(petArr);

    // Update Local Storage after deletion
    saveToStorage(KEY, petArr);
  }
}

// Add Click event for healthyBtn to Show healthy pet
let healthyCheck = true;

healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    function checkHealth(pet) {
      return pet.vaccinated && pet.dewormed && pet.sterilized;
    }
    const healthyPetArr = petArr.filter(checkHealth);

    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// Get breed data from Local Storage
const KEY_breed = "breedArr";
const breedArr = getFromStorage(KEY_breed);

// Function filterBreed for Dog and Cat
function filterBreedDog() {
  const breedArrDog = breedArr.filter((br) => br.type === "Dog");
  for (let i = 0; i < breedArrDog.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArrDog[i].breedName}</option>`;
    breedInput.appendChild(option);
  }
}

function filterBreedCat() {
  const breedArrCat = breedArr.filter((br) => br.type === "Cat");
  for (let i = 0; i < breedArrCat.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `<option>${breedArrCat[i].breedName}</option>`;
    breedInput.appendChild(option);
  }
}

// Function renderBreed
function renderBreed() {
  if (typeInput.value === "Select Type") {
    breedInput.innerHTML = "";
  } else if (typeInput.value === "Dog") {
    breedInput.innerHTML = "";
    filterBreedDog();
  } else if (typeInput.value === "Cat") {
    breedInput.innerHTML = "";
    filterBreedCat();
  }
}

// Render corresponding Breed options when Type Input is changed
typeInput.addEventListener("change", renderBreed);
