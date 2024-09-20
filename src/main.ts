import './style.css';

// region Tasks definition

type Task = { name: string; done: boolean };

const tasks: Task[] = [];

// endregion

// region Update

function loadListToDom() {
    const ul = document.querySelector('.todos-container') as HTMLUListElement;
    ul.innerHTML = '';

    for (const task of tasks) {
        ul.appendChild(getListItem(task));
    }
}

// endregion

// region Setup

function setup() {
    const form = document.querySelector('.add-todo-form') as HTMLFormElement;
    const input = document.querySelector('.add-todo-input') as HTMLInputElement;

    form.addEventListener('submit', () => {
        const name = input.value.trim();

        if (name === '') {
            return;
        }

        addTodo(name);
        input.value = '';
    });

    const tasksFromStorage = localStorage.getItem('tasks');

    if (!tasksFromStorage) {
        tasks.push(
            { name: 'Buy milk', done: false },
            { name: 'Buy eggs', done: true },
            { name: 'Buy bread', done: false },
        );
    } else {
        const storedTasks: Task[] = JSON.parse(tasksFromStorage);
        tasks.push(...storedTasks);
    }

    loadListToDom();
}

setup();

// endregion

// region Utils

function getListItem(task: Task) {
    const li = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    input.type = 'checkbox';
    input.checked = task.done;
    input.addEventListener('change', () => tickTodo(task));
    span.className = 'icon-[mingcute--delete-fill] text-red-300 hover:scale-110';
    span.addEventListener('click', () => removeTodo(task));
    label.appendChild(input);
    label.append(task.name);
    label.appendChild(span);
    li.appendChild(label);
    return li;
}

function addTodo(name: string) {
    tasks.unshift({ name, done: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadListToDom();
}

function tickTodo(task: Task) {
    task.done = !task.done;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadListToDom();
}

function removeTodo(task: Task) {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadListToDom();
}

// endregion
