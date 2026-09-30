document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  const menuButton = document.getElementById('menu');
  const sidebar = document.getElementById('sidebar');
  const dashboard = document.querySelector('.dashboard-container');

  menuButton.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    dashboard.classList.toggle('sidebar-open', isOpen);
  });

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  const NAME_MAX_LENGTH = 60;
  const DESCRIPTION_MAX_LENGTH = 300;

  const form = document.getElementById('specialty-form');
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const statusInput = document.getElementById('status');
  const nameError = document.getElementById('name-error');
  const descriptionError = document.getElementById('description-error');
  const formTitle = document.getElementById('form-title');
  const formDescription = document.getElementById('form-description');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  const submitLabel = document.getElementById('submit-label');
  const specialtyId = new URLSearchParams(window.location.search).get('id');
  const specialtyToEdit = specialtyId ? getSpecialtyById(specialtyId) : null;

  if (specialtyId && !specialtyToEdit) {
    saveToast('No se encontró la especialidad seleccionada.');
    window.location.href = 'specialties.html';
    return;
  }

  if (specialtyToEdit) {
    document.title = 'Editar Especialidad';
    formTitle.textContent = 'Editar Especialidad';
    formDescription.textContent =
      'Modifique la información técnica y administrativa de la especialidad médica.';
    breadcrumbCurrent.textContent = 'Editar Especialidad';
    submitLabel.textContent = 'Guardar Cambios';
    nameInput.value = specialtyToEdit.name;
    descriptionInput.value = specialtyToEdit.description;
    statusInput.value = specialtyToEdit.status || 'Activo';
  }

  const showError = (input, errorElement, message) => {
    errorElement.textContent = message;
    input.classList.add('input-error');
  };

  const clearError = (input, errorElement) => {
    errorElement.textContent = '';
    input.classList.remove('input-error');
  };

  const validateField = (input, errorElement, label, maxLength) => {
    const value = input.value.trim();

    if (value === '') {
      showError(input, errorElement, `El campo ${label} es obligatorio.`);
      return false;
    }

    if (value.length > maxLength) {
      showError(
        input,
        errorElement,
        `El campo ${label} no puede superar los ${maxLength} caracteres (actual: ${value.length}).`
      );
      return false;
    }

    clearError(input, errorElement);
    return true;
  };

  const validateForm = () => {
    const isNameValid = validateField(
      nameInput,
      nameError,
      'Nombre',
      NAME_MAX_LENGTH
    );
    const isDescriptionValid = validateField(
      descriptionInput,
      descriptionError,
      'Descripción',
      DESCRIPTION_MAX_LENGTH
    );
    return isNameValid && isDescriptionValid;
  };

  const saveSpecialty = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const specialty = {
      id: specialtyToEdit ? specialtyToEdit.id : crypto.randomUUID(),
      name: nameInput.value.trim(),
      description: descriptionInput.value.trim(),
      status: statusInput.value,
    };

    if (specialtyToEdit) {
      updateSpecialty(specialty);
      saveToast('Especialidad actualizada correctamente.');
    } else {
      addSpecialty(specialty);
      saveToast('Especialidad agregada correctamente.');
    }

    window.location.href = 'specialties.html';
  };

  form.addEventListener('submit', saveSpecialty);
  nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  descriptionInput.addEventListener('input', () =>
    clearError(descriptionInput, descriptionError)
  );

});
