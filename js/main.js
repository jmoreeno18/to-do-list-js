const formulario = document.getElementById('formulario');
const task = document.getElementById('task');
const btn1 = document.getElementById('btn-1');
const listTask = document.getElementById('list-task');

// Cargar tareas desde localStorage al inicio
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
});

// Función para agregar una tarea al DOM
function addTaskToDOM(text, completed = false) {
    listTask.innerHTML += `
        <article class="list-task__article" style="${completed ? 'background-color: rgb(87, 77, 77);' : ''}">
            <p class="text-task">${completed ? `<del>${text}</del>` : text}</p>
            <div class="icons">
                <button class="btn-icon btn-icon-2" id="btn-2">
                    <i class="bi bi-check2"></i>
                </button>
                <button class="btn-icon btn-icon-3" id="btn-3">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </article>
    `;
}

// Agregar nueva tarea al hacer clic en el botón
btn1.addEventListener('click', () => {
    let text = task.value;

    if (text.trim() !== '') {
        addTaskToDOM(text);
        saveTasksToLocalStorage();
        task.value = '';
    }
});

// Guardar tareas en localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.list-task__article').forEach(article => {
        const textTask = article.querySelector('.text-task').textContent;
        const completed = article.querySelector('.text-task').innerHTML.includes('<del>');
        tasks.push({ text: textTask, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Manejar clic en los botones de la lista de tareas
listTask.addEventListener('click', (event) => {
    const articleElement = event.target.closest('.list-task__article');
    
    if (event.target.closest('.btn-icon-2')) {
        const taskElement = articleElement.querySelector('.text-task');
        taskElement.innerHTML = `<del>${taskElement.textContent}</del>`;
        articleElement.style.backgroundColor = 'rgb(87, 77, 77)';
        saveTasksToLocalStorage(); // Guardar cambios en localStorage
    }

    if (event.target.closest('.btn-icon-3')) {
        // Añadir la transición al artículo
        articleElement.style.transition = 'all ease-in-out 1.5s';
        articleElement.style.opacity = '0'; // Desvanecer el artículo

        setTimeout(() => {
            articleElement.remove();
            saveTasksToLocalStorage(); // Guardar cambios en localStorage
        }, 1500); 
    }
});
