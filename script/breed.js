'use strict';

// Lấy dữ liệu Breed từ LocalStorage và hiển thị trong bảng

// Khai báo các biến cần sử dụng
const submitBtn = document.getElementById('submit-btn');

const breedInput = document.getElementById('input-breed');
const typeInput = document.getElementById('input-type');
const tableBodyEl = document.getElementById('tbody');

// Tạo mảng breedArr

const breedArr = JSON.parse(getFromStorage('breedArr', '[]'));

// Khai báo hàm
// Hàm validate dữ liệu
function validateData(breedData) {
  // Không trường nào bị thiếu
  if (!breedData.breed) {
    alert('Please fill in the breed field.'); // Check for missing data
    return false;
  }
  // Kiểm tra Type đã được chọn
  if (breedData.type === 'Select Type') {
    alert('Please select Type!');
    return false;
  }
  return true;
}
// Hàm xóa dữ liệu đã nhập
function clearInput() {
  breedInput.value = '';
  typeInput.value = 'Select Type';
}
// Hàm xóa thú cưng
function deleteBreed(e) {
  if (confirm('Are you sure?')) {
    const breedRow = e.closest('tr');
    const breedIndex = Number(breedRow.dataset.index);
    breedArr.splice(breedIndex, 1);
    saveToStorage('breedArr', JSON.stringify(breedArr)); // Lưu dữ liệu vào LocalStorage
    renderBreedTable(breedArr);
  }
}
// Viết và gọi hàm renderBreedTable

function renderBreedTable(breeds) {
  // logic is here
  // Xóa nội dung hiện có của bảng
  tableBodyEl.innerHTML = '';

  // Duyệt qua mảng data và tạo các hàng tương ứng
  breeds.forEach((breed, index) => {
    const row = document.createElement('tr');
    row.setAttribute('data-index', `${index}`);
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${breed.breed}</td>
        <td>${breed.type}</td>
        <td><button type="button" class="btn btn-danger" onclick="deleteBreed(event.target)">Delete</button></td>
      `;
    tableBodyEl.appendChild(row);
  });
}
renderBreedTable(breedArr);

//  Thêm Breed
// Xử lý sự kiện submit:

submitBtn.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default form submission behavior
  // Lấy dữ liệu từ các input:
  const breedData = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // Kiểm tra và thêm dữ liệu vào mảng breedData:
  const validate = validateData(breedData);
  if (validate) {
    breedArr.push(breedData);
    saveToStorage('breedArr', JSON.stringify(breedArr)); // Lưu dữ liệu vào LocalStorage
    clearInput();
    renderBreedTable(breedArr);
  } else {
    alert('Validation error occurred. Please check your input!');
  }
});
