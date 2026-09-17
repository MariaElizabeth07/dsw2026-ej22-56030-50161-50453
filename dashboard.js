document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');
  
  const menuButton = document.getElementById('menu');

  const sidebar = document.getElementById('sidebar');
  
  console.log(menuButton);
  console.log(sidebar);

  menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');

  })

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

});