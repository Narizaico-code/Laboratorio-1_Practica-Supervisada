document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let tasks = [];
    let editingTaskId = null;
    
    // Elementos del DOM
    const todoForm = document.getElementById('todoForm');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const tasksList = document.getElementById('tasksList');
    const totalTasksEl = document.getElementById('totalTasks');
    const pendingTasksEl = document.getElementById('pendingTasks');
    const completedTasksEl = document.getElementById('completedTasks');
    const filterPriority = document.getElementById('filterPriority');
    const sortPriorityBtn = document.getElementById('sortPriorityBtn');
    
    // Prioridades en orden
    const priorityOrder = { alta: 3, media: 2, baja: 1 };
    
    // Tareas iniciales de ejemplo
    const initialTasks = [
        {
            id: 1,
            title: "Completar proyecto web",
            description: "Terminar la agenda web con todas sus funcionalidades",
            date: getTodayDate(),
            priority: "alta",
            completed: false
        },
        {
            id: 2,
            title: "Comprar víveres",
            description: "Leche, huevos, pan, frutas y verduras",
            date: getTomorrowDate(),
            priority: "media",
            completed: false
        },
        {
            id: 3,
            title: "Llamar al médico",
            description: "Pedir cita para chequeo anual",
            date: getFutureDate(3),
            priority: "baja",
            completed: true
        }
    ];
    
    // Inicializar la aplicación
    function init() {
        loadTasks();
        setupEventListeners();
        updateStats();
        renderTasks();
    }
    
    // Cargar tareas desde localStorage
    function loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            tasks = JSON.parse(savedTasks);
        } else {
            tasks = [...initialTasks];
            saveTasks();
        }
    }
    
    // Guardar tareas en localStorage
    function saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Formulario
        todoForm.addEventListener('submit', handleFormSubmit);
        
        // Botones
        cancelBtn.addEventListener('click', cancelEdit);
        clearAllBtn.addEventListener('click', clearAllTasks);
        sortPriorityBtn.addEventListener('click', sortTasksByPriority);
        
        // Filtros
        filterPriority.addEventListener('change', renderTasks);
        
        // Establecer fecha mínima como hoy
        document.getElementById('taskDate').min = getTodayDate();
        document.getElementById('taskDate').value = getTodayDate();
    }
    
    // Manejar envío del formulario
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const date = document.getElementById('taskDate').value;
        const priority = document.querySelector('input[name="taskPriority"]:checked').value;
        
        if (!title) {
            alert('Por favor ingresa un título para la tarea');
            return;
        }
        
        if (editingTaskId !== null) {
            // Editar tarea existente
            updateTask(editingTaskId, { title, description, date, priority });
            cancelEdit();
        } else {
            // Agregar nueva tarea
            const newTask = {
                id: Date.now(), // ID único basado en timestamp
                title,
                description,
                date,
                priority,
                completed: false
            };
            
            tasks.push(newTask);
        }
        
        saveTasks();
        updateStats();
        renderTasks();
        resetForm();
    }
    
    // Actualizar una tarea existente
    function updateTask(id, updates) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        }
    }
    
    // Eliminar una tarea
    function deleteTask(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
            tasks = tasks.filter(task => task.id !== id);
            saveTasks();
            updateStats();
            renderTasks();
        }
    }
    
    // Alternar estado de completado
    function toggleTaskCompletion(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            updateStats();
            renderTasks();
        }
    }
    
    // Iniciar edición de tarea
    function startEditTask(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            editingTaskId = id;
            
            // Llenar el formulario con los datos de la tarea
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskDate').value = task.date;
            
            // Establecer la prioridad correcta
            document.querySelector(`input[name="taskPriority"][value="${task.priority}"]`).checked = true;
            
            // Cambiar texto del formulario
            formTitle.textContent = '✏️ Editar Tarea';
            submitBtn.textContent = 'Actualizar Tarea';
            cancelBtn.style.display = 'inline-block';
            
            // Enfocar en el título
            document.getElementById('taskTitle').focus();
        }
    }
    
    // Cancelar edición
    function cancelEdit() {
        editingTaskId = null;
        resetForm();
        formTitle.textContent = '➕ Agregar Nueva Tarea';
        submitBtn.textContent = 'Agregar Tarea';
        cancelBtn.style.display = 'none';
    }
    
    // Limpiar todas las tareas
    function clearAllTasks() {
        if (tasks.length === 0) {
            alert('No hay tareas para eliminar');
            return;
        }
        
        if (confirm('¿Estás seguro de que deseas eliminar TODAS las tareas?')) {
            tasks = [];
            saveTasks();
            updateStats();
            renderTasks();
        }
    }
    
    // Ordenar tareas por prioridad
    function sortTasksByPriority() {
        tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        saveTasks();
        renderTasks();
        
        // Mostrar feedback visual
        const originalText = sortPriorityBtn.textContent;
        sortPriorityBtn.textContent = '¡Ordenadas!';
        sortPriorityBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            sortPriorityBtn.textContent = originalText;
            sortPriorityBtn.style.backgroundColor = '';
        }, 1500);
    }
    
    // Reiniciar formulario
    function resetForm() {
        todoForm.reset();
        document.getElementById('taskDate').value = getTodayDate();
        document.querySelector('input[name="taskPriority"][value="baja"]').checked = true;
    }
    
    // Actualizar estadísticas
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        
        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
        pendingTasksEl.textContent = pending;
    }
    
    // Renderizar tareas
    function renderTasks() {
        const filterValue = filterPriority.value;
        
        // Filtrar tareas según la prioridad seleccionada
        let filteredTasks = tasks;
        if (filterValue !== 'todas') {
            filteredTasks = tasks.filter(task => task.priority === filterValue);
        }
        
        if (filteredTasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <p>${filterValue === 'todas' ? '🎉 No tienes tareas pendientes. ¡Agrega una nueva!' : '📭 No hay tareas con esta prioridad'}</p>
                </div>
            `;
            return;
        }
        
        tasksList.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''} prioridad-${task.priority}`;
            taskElement.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <div class="task-content">
                    <div class="task-header">
                        <h4 class="task-title">${escapeHtml(task.title)}</h4>
                        <span class="task-priority ${task.priority}">${task.priority.toUpperCase()}</span>
                    </div>
                    ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
                    <div class="task-footer">
                        <span class="task-date">📅 ${formatDate(task.date)}</span>
                        <div class="task-actions">
                            <button class="task-action-btn edit-btn" title="Editar">✏️</button>
                            <button class="task-action-btn delete-btn" title="Eliminar">🗑️</button>
                        </div>
                    </div>
                </div>
            `;
            
            // Event listeners para esta tarea
            const checkbox = taskElement.querySelector('.task-checkbox');
            const editBtn = taskElement.querySelector('.edit-btn');
            const deleteBtn = taskElement.querySelector('.delete-btn');
            
            checkbox.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleTaskCompletion(task.id);
            });
            
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                startEditTask(task.id);
            });
            
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(task.id);
            });
            
            // Hacer clic en toda la tarea para marcar como completada
            taskElement.addEventListener('click', (e) => {
                if (!e.target.closest('.task-actions')) {
                    toggleTaskCompletion(task.id);
                }
            });
            
            tasksList.appendChild(taskElement);
        });
    }
    
    // Funciones de utilidad
    function getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }
    
    function getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }
    
    function getFutureDate(days) {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    }
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Inicializar la aplicación
    init();
});