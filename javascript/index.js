document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Obtener valores del formulario
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validación básica
            if (!username || !password) {
                alert('Por favor, complete todos los campos.');
                return;
            }
            
            console.log('Login attempt with:', username); // Para debug
            
            // Guardar el email del usuario en localStorage para usarlo en el perfil
            localStorage.setItem('userEmail', username);
            
            // Verificar que se guardó correctamente
            const savedEmail = localStorage.getItem('userEmail');
            console.log('Saved to localStorage:', savedEmail); // Para debug
            
            // Redirigir a la página de contactos
            // Asegurar que la ruta sea correcta
            window.location.href = 'pages/contacto.html';
        });
        
        // Hacer que el primer campo tenga focus
        document.getElementById('username').focus();
        
        // Permitir submit con Enter
        document.getElementById('password').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                loginForm.dispatchEvent(new Event('submit'));
            }
        });
    }
});