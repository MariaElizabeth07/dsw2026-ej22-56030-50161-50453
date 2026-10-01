document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.getElementById('menu');
  const sidebar = document.getElementById('sidebar');
  const dashboard = document.querySelector('.dashboard-container');
  const searchInput = document.getElementById('specialty-search');
  const tableBody = document.getElementById('specialties-body');
  const total = document.getElementById('total-specialties');

  menuButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    dashboard.classList.toggle('sidebar-open', isOpen);
  });

  logoutButton.addEventListener('click', () => { window.location.href = 'login.html'; });

  const renderTable = () => {
    const criteria = searchInput.value.trim().toLowerCase();
    const specialties = getSpecialties().filter((specialty) =>
      specialty.name.toLowerCase().includes(criteria)
    );

    tableBody.innerHTML = '';
    total.textContent = getSpecialties().length;

    if (specialties.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" class="empty-row">No se encontraron especialidades.</td></tr>';
      return;
    }

    specialties.forEach((specialty) => {
      const row = document.createElement('tr');
      const status = specialty.status || 'Activo';
      row.dataset.id = specialty.id;
      row.innerHTML = `
        <td><i class="bi bi-heart-pulse specialty-icon"></i><strong>${specialty.name}</strong></td>
        <td>${specialty.description}</td>
        <td><span class="specialty-status ${status === 'Activo' ? 'active' : 'inactive'}">${status}</span></td>
        <td><button class="icon-button edit-specialty" type="button"><i class="bi bi-pencil"></i></button><button class="icon-button delete-specialty" type="button"><i class="bi bi-trash"></i></button></td>`;
      tableBody.appendChild(row);
    });
  };

  tableBody.addEventListener('click', (event) => {
    const button = event.target.closest('button');

    if (!button) return;

    const row = button.closest('tr');
    const specialtyId = row.dataset.id;

    if (button.classList.contains('edit-specialty')) {
      window.location.href = `specialty.html?id=${encodeURIComponent(specialtyId)}`;
    }

    if (button.classList.contains('delete-specialty')) {
      deleteSpecialty(specialtyId);
      renderTable();
      showToast('Especialidad eliminada correctamente.');
    }
  });

  searchInput.addEventListener('input', renderTable);
  renderTable();
  showSavedToast();
});
