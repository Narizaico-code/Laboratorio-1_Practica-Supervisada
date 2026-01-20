document.addEventListener('DOMContentLoaded', () => {
    console.log('Perfil page loaded'); // Para debug
    console.log('LocalStorage userEmail:', localStorage.getItem('userEmail')); // Para debug
    
    // Obtener el email guardado del login
    const savedEmail = localStorage.getItem('userEmail');
    const profileEmail = document.getElementById('profileEmail');
    
    // Si hay un email guardado, usarlo
    if (savedEmail) {
        profileEmail.textContent = savedEmail;
        
        // También actualizar el nombre de usuario basado en el email
        const username = savedEmail.split('@')[0]; // Tomar la parte antes del @
        const profileName = document.getElementById('profileName');
        const fullName = document.getElementById('fullName');
        
        // Capitalizar el nombre
        const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        profileName.textContent = capitalizedUsername + ' ' + document.getElementById('profileName').textContent.split(' ')[1];
        fullName.textContent = capitalizedUsername + ' ' + document.getElementById('fullName').textContent.split(' ').slice(1).join(' ');
    } else {
        console.warn('No se encontró userEmail en localStorage');
        profileEmail.textContent = 'usuario@ejemplo.com'; // Valor por defecto
    }
    
    // Botón para editar perfil
    const editProfileBtn = document.getElementById('editProfile');
    editProfileBtn.addEventListener('click', () => {
        alert('Funcionalidad de editar perfil en desarrollo. Por ahora, esta es solo una vista de demostración.');
    });
    
    // Botón para cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            // Limpiar datos de sesión
            localStorage.removeItem('userEmail');
            localStorage.removeItem('contactoSeleccionado');
            // Redirigir al login
            window.location.href = '../index.html';
        }
    });
    
    // Cambiar imagen de perfil (solo visual)
    const profileImage = document.getElementById('profileImage');
    const imageOverlay = document.querySelector('.image-overlay');
    
    imageOverlay.addEventListener('click', () => {
        alert('En una versión completa, aquí podrías subir una nueva foto de perfil.');
    });
    
    // Hacer la imagen de perfil enfocable
    profileImage.setAttribute('tabindex', '0');
    profileImage.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            imageOverlay.click();
        }
    });
});