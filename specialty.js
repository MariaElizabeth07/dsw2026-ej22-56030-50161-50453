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

  const NAME_MAX_LENGTH = 15;
  const DESCRIPTION_MAX_LENGTH = 100;

  const form = document.getElementById('specialty-form');
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const nameError = document.getElementById('name-error');
  const descriptionError = document.getElementById('description-error');
  const successMessage = document.getElementById('form-success');

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
    successMessage.textContent = '';

    if (!validateForm()) {
      return;
    }

    const specialty = addSpecialty({
      id: crypto.randomUUID(),
      name: nameInput.value.trim(),
      description: descriptionInput.value.trim(),
    });

    console.log(specialty);
    successMessage.textContent = 'Especialidad guardada correctamente.';
    form.reset();
  };

  form.addEventListener('submit', saveSpecialty);
  nameInput.addEventListener('input', () => clearError(nameInput, nameError));
  descriptionInput.addEventListener('input', () =>
    clearError(descriptionInput, descriptionError)
  );

  nameInput.addEventListener('input', () => (successMessage.textContent = ''));
  descriptionInput.addEventListener('input', () => (successMessage.textContent = ''));
});