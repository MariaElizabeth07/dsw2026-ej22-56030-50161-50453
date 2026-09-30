const PAGE_SIZE = 5;

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.getElementById('menu');
  const sidebar = document.getElementById('sidebar');
  const dashboard = document.querySelector('.dashboard-container');

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const tableBody = document.getElementById('specialties-body');
  const footer = document.getElementById('directory-footer');

  let currentPage = 1;

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
      return;
    }

    list.forEach((specialty) => {
      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = specialty.name;

      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = specialty.description;

      row.append(nameCell, descriptionCell);
      tableBody.appendChild(row);
    });
  };

  const renderFooter = (totalFiltered, totalGeneral, totalPages) => {
    footer.innerHTML = '';

    const info = document.createElement('span');
    info.textContent = `Mostrando ${totalFiltered === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, totalFiltered)} de ${totalFiltered} resultados (${totalGeneral} en total)`;

    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    const prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'button button-secondary';
    prevButton.textContent = 'Anterior';
    prevButton.disabled = currentPage <= 1;
    prevButton.addEventListener('click', () => {
      currentPage -= 1;
      filterTable();
    });

    const pageIndicator = document.createElement('span');
    pageIndicator.textContent = `Página ${totalPages === 0 ? 0 : currentPage} de ${totalPages}`;

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'button button-secondary';
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = currentPage >= totalPages;
    nextButton.addEventListener('click', () => {
      currentPage += 1;
      filterTable();
    });

    pagination.append(prevButton, pageIndicator, nextButton);
    footer.append(info, pagination);
  };

  const filterTable = () => {
    const allSpecialties = getSpecialties();
    const criteria = searchInput.value.trim().toLowerCase();

    const filtered = allSpecialties.filter((specialty) =>
      specialty.name.toLowerCase().includes(criteria)
    );

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    renderTable(pageItems);
    renderFooter(filtered.length, allSpecialties.length, totalPages);
  };

  searchButton.addEventListener('click', () => {
    currentPage = 1;
    filterTable();
  });

  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      currentPage = 1;
      filterTable();
    }
  });

  filterTable();
});