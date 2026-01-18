document.addEventListener('DOMContentLoaded', () => {
    const detallesDiv = document.getElementById('detalles-contacto');
    const volverBtn = document.getElementById('volver');

    // Recuperar datos del localStorage
    const contactoData = localStorage.getItem('contactoSeleccionado');
    
    if (!contactoData) {
        detallesDiv.innerHTML = '<p style="text-align: center; color: #666; font-size: 1.1rem;">No se encontraron datos del contacto.</p>';
        return;
    }

    const contacto = JSON.parse(contactoData);
    
    // Manejar la imagen - intentamos usar la ruta guardada o construir una basada en el número
    let imagenSrc = contacto.imagenSrc;
    
    // Si no tenemos src, intentamos construir la ruta basada en el número del contacto
    if (!imagenSrc && contacto.numero) {
        // Asumimos que las imágenes están en ../images/contactoX.jpeg
        imagenSrc = `../images/contacto${contacto.numero}.jpeg`;
    }

    // Mostrar los detalles del contacto con la imagen
    detallesDiv.innerHTML = `
        <div class="contacto-detalle">
            <img src="${imagenSrc}" alt="${contacto.imagenAlt || `Imagen de ${contacto.name} ${contacto.lastname}`}" class="imagen-detalle" onerror="this.src='../images/default-avatar.jpg'; this.alt='Imagen no disponible'">
            <div class="info-detalle">
                <h2> Nombre: ${contacto.name}</h2>
                <h2> Apellido: ${contacto.lastname}</h2>
                <p>
                    <strong>ID:</strong>
                    <span>${contacto.id}</span>
                </p>
                <p>
                    <strong>Email:</strong>
                    <span>${contacto.email}</span>
                </p>
                <p>
                    <strong>Teléfono:</strong>
                    <span>${contacto.tel}</span>
                </p>
                <p>
                    <strong>Número de contacto:</strong>
                    <span>${contacto.numero || 'N/A'}</span>
                </p>
            </div>
        </div>
    `;

    // Evento para el botón volver
    volverBtn.addEventListener('click', () => {
        // Limpiar localStorage si es necesario
        localStorage.removeItem('contactoSeleccionado');
        window.location.href = '../pages/contacto.html';
    });
});