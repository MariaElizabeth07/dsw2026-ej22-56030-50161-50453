const SPECIALTIES_KEY = 'specialties';
const TOAST_KEY = 'specialtiesToast';

const DEFAULT_SPECIALTIES = [
  {
    id: 'GUID-1',
    name: 'Cardiología',
    description: 'Estudio y tratamiento de trastornos del corazón y del sistema circulatorio.',
    status: 'Activo',
  },
  {
    id: 'GUID-2',
    name: 'Neurología',
    description: 'Diagnóstico y tratamiento de todas las categorías de afecciones cerebrales.',
    status: 'Activo',
  },
  {
    id: 'GUID-3',
    name: 'Dermatología',
    description: 'Atención integral de enfermedades de la piel, uñas y cabello.',
    status: 'Inactivo',
  },
  {
    id: 'GUID-4',
    name: 'Pediatría',
    description: 'Cuidado médico de lactantes, niños y adolescentes.',
    status: 'Activo',
  },
];

function getSpecialties() {
  const raw = localStorage.getItem(SPECIALTIES_KEY);

  if (raw === null) {
    saveSpecialties(DEFAULT_SPECIALTIES);
    return DEFAULT_SPECIALTIES;
  }

  return JSON.parse(raw);
}

function saveSpecialties(specialties) {
  localStorage.setItem(SPECIALTIES_KEY, JSON.stringify(specialties));
}

function addSpecialty(specialty) {
  const specialties = getSpecialties();
  specialties.push(specialty);
  saveSpecialties(specialties);
  return specialty;
}

function getSpecialtyById(id) {
  return getSpecialties().find((specialty) => specialty.id === id);
}

function updateSpecialty(updatedSpecialty) {
  const specialties = getSpecialties().map((specialty) =>
    specialty.id === updatedSpecialty.id ? updatedSpecialty : specialty
  );

  saveSpecialties(specialties);
  return updatedSpecialty;
}

function deleteSpecialty(id) {
  const specialties = getSpecialties().filter(
    (specialty) => specialty.id !== id
  );

  saveSpecialties(specialties);
}

function saveToast(message) {
  sessionStorage.setItem(TOAST_KEY, message);
}

function showToast(message) {
  const previousToast = document.querySelector('.toast');

  if (previousToast) {
    previousToast.remove();
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}

function showSavedToast() {
  const message = sessionStorage.getItem(TOAST_KEY);

  if (message) {
    sessionStorage.removeItem(TOAST_KEY);
    showToast(message);
  }
}
