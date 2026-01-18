document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (!username || !password) {
                alert('Por favor, complete todos los campos.');
                return;
            }
            
            // Guardar el email en localStorage
            localStorage.setItem('userEmail', username);
            
            // Contactos
            window.location.href = 'pages/contacto.html';
        });
        
        document.getElementById('username').focus();
        
    }
});