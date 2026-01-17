document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los contactos usando una clase común
    const contactos = document.querySelectorAll('.contactos > div[id^="contacto"]');
    
    contactos.forEach(contacto => {
        // Hacer que cada contacto sea enfocable
        contacto.setAttribute('tabindex', '0');
        contacto.setAttribute('role', 'button');
        contacto.setAttribute('aria-label', `Ver detalles del contacto`);

        contacto.addEventListener('click', () => {
            const nombre = contacto.querySelector('.nombre')?.textContent.trim() || '';
            const apellido = contacto.querySelector('.apellido')?.textContent.trim() || '';
            const correo = contacto.querySelector('.correo')?.textContent.trim() || '';
            const telefono = contacto.querySelector('#telefono')?.textContent.trim() || '';
            const imagen = contacto.querySelector('img')?.src || '';

            // Crear objeto con los datos
            const datosContacto = {
                id: contacto.id,
                name: nombre,
                lastname: apellido,
                email: correo,
                tel: telefono,
                imagen: imagen
            };

            // Guardar en localStorage
            localStorage.setItem('contactoSeleccionado', JSON.stringify(datosContacto));
            
            // Redirigir a detalles.html
            window.location.href = '../pages/detalles.html';
        });

        // Evento para teclado (accesibilidad)
        contacto.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contacto.click();
            }
        });

        // Efectos visuales para hover (opcional)
        contacto.addEventListener('mouseenter', () => {
            contacto.style.backgroundColor = '#f0f0f0';
            contacto.style.transform = 'scale(1.02)';
            contacto.style.transition = 'all 0.2s ease';
        });

        contacto.addEventListener('mouseleave', () => {
            contacto.style.backgroundColor = '';
            contacto.style.transform = 'scale(1)';
        });

        // Efecto al enfocar (para accesibilidad)
        contacto.addEventListener('focus', () => {
            contacto.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.5)';
        });

        contacto.addEventListener('blur', () => {
            contacto.style.boxShadow = '';
        });
    });
});