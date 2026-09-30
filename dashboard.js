document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.getElementById('menu');
  const sidebar = document.getElementById('sidebar');
  const dashboard = document.querySelector('.dashboard-container');

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const tableBody = document.getElementById('specialties-body');
  const footer = document.getElementById('directory-footer');

  let specialties = [];

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
  
});
  const renderTable = (list) => {
    tableBody.innerHTML = '';

    if (list.length === 0) {
      const row = document.createElement('tr');
      row.className = 'empty-row';
      const cell = document.createElement('td');
      cell.colSpan = 2;
      cell.textContent = 'No se encontraron especialidades.';
      row.appendChild(cell);
      tableBody.appendChild(row);
    } else {
      list.forEach((specialty) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = specialty.name;

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = specialty.description;

        row.append(nameCell, descriptionCell);
        tableBody.appendChild(row);
      });
    }

    footer.textContent = `Mostrando ${list.length} de ${specialties.length} resultados`;
  };

  const filterTable = () => {
    const criteria = searchInput.value.trim().toLowerCase();
    const filtered = specialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(criteria)
    );
    renderTable(filtered);
  };

  searchButton.addEventListener('click', filterTable);

  const loadSpecialties = async () => {
    try {
      const response = await fetch('specialties.json');
      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status}`);
      }
      specialties = await response.json();
      renderTable(specialties);
    } catch (error) {
      console.error('No se pudo cargar specialties.json:', error);
      tableBody.innerHTML = '';
      const row = document.createElement('tr');
      row.className = 'empty-row';
      const cell = document.createElement('td');
      cell.colSpan = 2;
      cell.textContent = 'No se pudieron cargar las especialidades.';
      row.appendChild(cell);
      tableBody.appendChild(row);
      footer.textContent = '';
    }
  };

  loadSpecialties();
});
