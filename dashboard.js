document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.getElementById('menu');
  const sidebar = document.getElementById('sidebar');
  const dashboard = document.querySelector('.dashboard-container');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const doctorRows = document.querySelectorAll('#doctors-body tr');

  menuButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    dashboard.classList.toggle('sidebar-open', isOpen);
  });

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  document.getElementById('add-specialty').addEventListener('click', () => {
    window.location.href = 'specialty.html';
  });

  const filterDoctors = () => {
    const criteria = searchInput.value.trim().toLowerCase();

    doctorRows.forEach((row) => {
      row.hidden = !row.textContent.toLowerCase().includes(criteria);
    });
  };

  searchButton.addEventListener('click', filterDoctors);
  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') filterDoctors();
  });
});
