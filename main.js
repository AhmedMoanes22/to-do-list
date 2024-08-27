// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');


// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('standard') : changeTheme(savedTheme);

// Functions
function addToDo(event) {
    event.preventDefault();

    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
        alert("You must write something!");
    } else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        savelocal(toDoInput.value);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        const edit = document.createElement('button');
        edit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        edit.classList.add('edit-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(edit);

        edit.addEventListener('click', function() {
            let text = prompt("Edit your todo", newToDo.innerText);
            if (text) {
                updateLocalTodos(text, newToDo.innerText);
                newToDo.innerText = text;
            }
        });

        toDoList.appendChild(toDoDiv);
        toDoInput.value = '';
    }
}

function deletecheck(event) {
    const item = event.target;

    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function() {
            item.parentElement.remove();
        });
    }

    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}

function savelocal(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(todo) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);

        const newToDo = document.createElement('li');
        newToDo.innerText = todo;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);

        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);

        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);

        const edit = document.createElement('button');
        edit.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        edit.classList.add('edit-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(edit);

        edit.addEventListener('click', function() {
            let text = prompt("Edit your task", newToDo.innerText);
            if (text) {
                updateLocalTodos(text, newToDo.innerText);
                newToDo.innerText = text;
            }
        });

        toDoList.appendChild(toDoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalTodos(newText, oldText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const index = todos.indexOf(oldText);
    if (index !== -1) {
        todos[index] = newText;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}


