document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los contactos favoritos
    const favoritos = document.querySelectorAll('.favoritos > .contacto');
    
    favoritos.forEach(contacto => {
        // Hacer que cada contacto sea enfocable
        contacto.setAttribute('tabindex', '0');
        contacto.setAttribute('role', 'button');
        contacto.style.cursor = 'pointer';
        contacto.style.outline = 'none';

        contacto.addEventListener('click', () => {
            // Obtener datos del contacto
            const nombre = contacto.querySelector('.nombre')?.textContent.trim() || '';
            const apellido = contacto.querySelector('.apellido')?.textContent.trim() || '';
            const correo = contacto.querySelector('.correo')?.textContent.trim() || '';
            const telefono = contacto.querySelector('.telefono')?.textContent.trim() || '';
            const imagenElement = contacto.querySelector('img');
            
            // Crear objeto con los datos
            const datosContacto = {
                id: contacto.id,
                name: nombre,
                lastname: apellido,
                email: correo,
                tel: telefono,
                imagenSrc: imagenElement?.src || '',
                imagenAlt: imagenElement?.alt || '',
                esFavorito: true
            };

            // Guardar en localStorage
            localStorage.setItem('contactoSeleccionado', JSON.stringify(datosContacto));
            
            // detalles
            window.location.href = 'detalles.html';
        });

        contacto.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                contacto.click();
            }
        });
    });
});