const SPECIALTIES_KEY = 'specialties';

function getSpecialties() {
  const raw = localStorage.getItem(SPECIALTIES_KEY);

  if (raw === null) {
    
    const empty = [];
    saveSpecialties(empty);
    return empty;
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