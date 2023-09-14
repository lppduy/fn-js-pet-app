'use strict';

// Lưu dữ liệu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
// Lấy dữ liệu từ LocalStorage
function getFromStorage(key, defaultValue) {
  return localStorage.getItem(key) ?? defaultValue;
}
