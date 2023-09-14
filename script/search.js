'use strict';

const breedInput = document.getElementById('input-breed');
function renderBreed(breedArr) {
  breedInput.innerHTML = `
  <option>Select Breed</option>
  `;
  breedArr.forEach(breedEl => {
    // const option = document.createElement('option');
    // breedInput.appendChiild(option);
    breedInput.insertAdjacentHTML(
      'beforeend',
      `<option>${breedEl.breed}</option>`
    );
  });
}
const breedArr = JSON.parse(getFromStorage('breedArr'));

renderBreed(breedArr);

// Xử lý khi nút "Find" được nhấn

const findBtn = document.getElementById('find-btn');
findBtn.addEventListener('click', function () {
  const id = document.getElementById('input-id').value;
  const name = document.getElementById('input-name').value;
  const type = document.getElementById('input-type').value;
  const breed = document.getElementById('input-breed').value;
  const vaccinated = document.getElementById('input-vaccinated').checked;
  const dewormed = document.getElementById('input-dewormed').checked;
  const sterilized = document.getElementById('input-sterilized').checked;

  // Gọi hàm để tìm kiếm và hiển thị kết quả
  searchPets(id, name, type, breed, vaccinated, dewormed, sterilized);
});

// Hàm tìm kiếm và hiển thị kết quả
function searchPets(id, name, type, breed, vaccinated, dewormed, sterilized) {
  // Lấy dữ liệu từ LocalStorage
  const petArr = JSON.parse(getFromStorage('petArr', '[]'));

  // Thực hiện tìm kiếm dựa trên các tiêu chí
  const searchResults = petArr.filter(pet => {
    return (
      (id === '' || pet.id.toLowerCase().includes(id.toLowerCase())) &&
      (name === '' || pet.name.toLowerCase().includes(name.toLowerCase())) &&
      (type === 'Select Type' || pet.type === type) &&
      (breed === 'Select Breed' || pet.breed === breed) &&
      (!vaccinated || pet.vaccinated) &&
      (!dewormed || pet.dewormed) &&
      (!sterilized || pet.sterilized)
    );
  });

  // Hiển thị kết quả tìm kiếm
  renderTableData(searchResults);
}

// Hàm hiển thị dữ liệu trong bảng
function renderTableData(petArr) {
  const tableBodyEl = document.getElementById('tbody');

  tableBodyEl.innerHTML = '';

  petArr.forEach(pet => {
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
  `;

    tableBodyEl.appendChild(row);
  });
}
