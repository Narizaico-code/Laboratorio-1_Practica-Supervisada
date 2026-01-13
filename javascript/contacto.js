document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.contactos [id^="contacto"]').forEach(el => {
        el.tabIndex = 0;

        const getText = (selector) => el.querySelector(selector)?.innerText.trim() || '';

        el.addEventListener('click', () => {
            const data = {
                id: el.id,
                name: getText('.nombre'),
                lastname: getText('.apellido'),
                email: getText('.correo'),
                tel: getText('#telefono')
            };

            localStorage.setItem('contactoSeleccionado', JSON.stringify(data));
            window.location.href = '../pages/detalles.html';

        });

        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                el.click();
            }
        });
    });
});