'use strict';

'use strict';

// Lấy ra các DOM Element mình cần sử dụng
const submitBtn = document.getElementById('submit-btn');

const containerForm = document.getElementById('container-form');
const controlForms = document.querySelectorAll('.form-control');
const customControlInput = document.querySelectorAll('.custom-control-input');

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');
const tableBodyEl = document.getElementById('tbody');

// Tạo biến global petArr là một mảng lưu danh sách thú cưng
// const petArr = [];
const petArr = JSON.parse(getFromStorage('petArr', '[]'));

// Hàm validate dữ liệu
function validateData(petData) {
  // Không trường nào bị thiếu
  if (
    !petData.name ||
    !petData.age ||
    !petData.type ||
    !petData.breed ||
    !petData.weight ||
    !petData.length
  ) {
    alert('Please fill in all the fields.'); // Check for missing data
    return false;
  }
  // Kiểm tra ID không được trùng
  const existingPets = petArr.filter(pet => pet.id === petData.id);
  // if (existingPets.length > 0) {
  //   alert('ID must be unique!');
  //   return false;
  // }

  // Kiểm tra giá trị Age trong khoảng hợp lệ
  if (petData.age < 1 || petData.age > 15) {
    alert('Age must be between 1 and 15!');
    return false;
  }

  // Kiểm tra giá trị Weight trong khoảng hợp lệ
  if (petData.weight < 1 || petData.weight > 15) {
    alert('Weight must be between 1 and 15!');
    return false;
  }

  // Kiểm tra giá trị Length trong khoảng hợp lệ
  if (petData.length < 1 || petData.length > 100) {
    alert('Length must be between 1 and 100!');
    return false;
  }

  // Kiểm tra Type đã được chọn
  if (petData.type === 'Select Type') {
    alert('Please select Type!');
    return false;
  }

  // Kiểm tra Breed đã được chọn
  if (petData.breed === 'Select Breed') {
    alert('Please select Breed!');
    return false;
  }

  return true;
}

// Hàm render dữ liệu lên bảng
function renderTableData(data) {
  // Xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = '';

  // Duyệt qua mảng data và tạo các hàng tương ứng
  data.forEach(pet => {
    const row = document.createElement('tr');
    row.setAttribute('id', `row-${pet.id}`);
    row.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td>${
        pet.vaccinated
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${
        pet.dewormed
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${
        pet.sterilized
          ? '<i class="bi bi-check-circle-fill"></i>'
          : '<i class="bi bi-x-circle-fill"></i>'
      }</td>
      <td>${pet.date}</td>
      <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
        pet.id
      }')">Edit</button></td>
    `;

    tableBodyEl.appendChild(row);
  });
}

// Hàm xóa dữ liệu đã nhập
function clearInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hàm xóa thú cưng
function startEditPet(petId) {
  containerForm.classList.remove('hide');
  renderBreed(JSON.parse(getFromStorage('breedArr')));
  const currentPet = petArr.find(pet => pet.id === petId);
  const currentPetKeys = Object.keys(currentPet);
  controlForms.forEach((form, index) => {
    form.value = currentPet[currentPetKeys[index]];
  });
  customControlInput.forEach((form, index) => {
    form.checked = currentPet[currentPetKeys[index + 8]];
  });
  const petIndex = petArr.findIndex(pet => pet.id === petId);
  petArr.splice(petIndex, 1);
}

// Hàm hiển thị Breed trong màn hình quản lý thú cưng

function renderBreed(breedArrFilter) {
  breedInput.innerHTML = '';
  breedArrFilter.forEach(breed => {
    const option = document.createElement('option');
    option.innerHTML = `<option>${breed.breed}</option>`;
    breedInput.appendChild(option);
  });
}
// Render Breed khi đổi type
typeInput.addEventListener('change', e => {
  const typeSelected = e.target.value;
  const breedArr = JSON.parse(getFromStorage('breedArr'));
  const breedArrFilter = breedArr.filter(breed => breed.type === typeSelected);
  renderBreed(breedArrFilter);
});

// Xử lý sự kiện submit
submitBtn.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Lấy dữ liệu từ các input
  const petData = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date().toLocaleDateString('en-US'),
  };

  // Kiểm tra và thêm dữ liệu vào mảng petArr
  const validate = validateData(petData);

  if (validate) {
    petArr.push(petData);
    saveToStorage('petArr', JSON.stringify(petArr)); // Lưu dữ liệu vào LocalStorage
    clearInput();
    renderTableData(JSON.parse(getFromStorage('petArr')));
    containerForm.classList.add('hide');
  } else {
    alert('Validation error occurred. Please check your input!');
  }
});

renderTableData(JSON.parse(getFromStorage('petArr')));
