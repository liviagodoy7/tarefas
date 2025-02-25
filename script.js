document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const clearTasksButton = document.getElementById('clearTasksButton');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas do localStorage
    loadTasks();

    // Adicionar tarefa
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Limpar todas as tarefas
    clearTasksButton.addEventListener('click', () => {
        localStorage.removeItem('tasks');
        loadTasks();
    });

    function addTask(taskText) {
        const tasks = getTasks();
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    function loadTasks() {
        const tasks = getTasks();
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                removeTask(index);
            });
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    }

    function removeTask(index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    function getTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }
});