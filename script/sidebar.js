'use strict';

// Toggle class active when click on navbar
const sidebarTitleEl = document.getElementById('sidebar-title');
const sidebarEl = document.getElementById('sidebar');
sidebarTitleEl.addEventListener('click', function () {
  sidebarEl.classList.toggle('active');
});
