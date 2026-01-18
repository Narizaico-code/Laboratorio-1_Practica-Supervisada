document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los contactos
    const contactos = document.querySelectorAll('.contactos > div[id^="contacto"]');
    
    contactos.forEach(contacto => {
        // Hacer que cada contacto sea enfocable
        contacto.setAttribute('tabindex', '0');
        contacto.setAttribute('role', 'button');
        
        // Agregar estilos para indicar que es interactivo
        contacto.style.cursor = 'pointer';
        contacto.style.outline = 'none';

        contacto.addEventListener('click', () => {
            // Obtener todos los datos del contacto
            const nombre = contacto.querySelector('.nombre')?.textContent.trim() || '';
            const apellido = contacto.querySelector('.apellido')?.textContent.trim() || '';
            const correo = contacto.querySelector('.correo')?.textContent.trim() || '';
            const telefono = contacto.querySelector('#telefono')?.textContent.trim() || '';
            const imagenElement = contacto.querySelector('img');
            
            // Obtener el número del contacto (1, 2, 3, etc.)
            const id = contacto.id;
            const numeroContacto = id.replace('contacto', '');
            
            // Crear objeto con los datos
            const datosContacto = {
                id: id,
                numero: numeroContacto,
                name: nombre,
                lastname: apellido,
                email: correo,
                tel: telefono,
                // Guardamos tanto el src actual como el número para reconstruir si es necesario
                imagenSrc: imagenElement?.src || '',
                imagenAlt: imagenElement?.alt || ''
            };

            console.log('Datos guardados:', datosContacto); // Para debug
            
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

        // Efectos para accesibilidad
        contacto.addEventListener('focus', () => {
            contacto.style.boxShadow = '0 0 0 3px rgba(74, 144, 226, 0.5)';
        });

        contacto.addEventListener('blur', () => {
            contacto.style.boxShadow = '';
        });
    });
});