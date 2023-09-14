'use strict';
// a. Export
// Lấy phần tử button để xuất dữ liệu
const exportBtn = document.getElementById('export-btn');

// Thêm lắng nghe sự kiện cho button xuất
exportBtn.addEventListener('click', function () {
  // Tạo đối tượng JSON mới chứa dữ liệu về thú cưng
  const pets = getFromStorage('petArr');

  // Tạo đối tượng Blob mới với dữ liệu JSON
  const blob = new Blob([pets], { type: 'application/json' });

  // Tạo URL tạm thời cho đối tượng Blob
  const url = URL.createObjectURL(blob);

  // Tạo phần tử anchor tạm thời
  const link = document.createElement('a');
  link.href = url;
  link.download = 'pets.json'; // Chỉ định tên file

  // Giả lập sự kiện click để kích hoạt việc tải xuống
  link.click();

  // Dọn dẹp
  URL.revokeObjectURL(url);
});

// b. Import

// Lấy phần tử input file
const inputFile = document.getElementById('input-file');
const importBtn = document.getElementById('import-btn');

// Thêm lắng nghe sự kiện khi người dùng chọn file
importBtn.addEventListener('click', function () {
  const file = inputFile.files[0];

  // Đọc nội dung file
  const reader = new FileReader();
  reader.onload = function (e) {
    const fileContent = e.target.result;

    try {
      // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
      const importedData = JSON.parse(fileContent);

      // Lấy dữ liệu đã lưu trữ trong LocalStorage (nếu có)
      let storedData = getFromStorage('petArr');
      if (storedData) {
        storedData = JSON.parse(storedData);
      } else {
        storedData = [];
      }

      // Ghi đè dữ liệu thú cưng khi ID trùng nhau
      importedData.forEach(pet => {
        const existingPetIndex = storedData.findIndex(
          existingPet => existingPet.id === pet.id
        );
        if (existingPetIndex !== -1) {
          storedData[existingPetIndex] = pet;
        } else {
          storedData.push(pet);
        }
      });

      // Lưu dữ liệu vào LocalStorage
      saveToStorage('petArr', JSON.stringify(storedData));

      // Thông báo thành công
      alert('Import thành công!');
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Import thất bại:', error);
    }
  };
  reader.readAsText(file);
});
