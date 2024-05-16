// 1. get elements by ID
const todoInput = document.getElementById('todoInput'); // 1.1 todoInput
const todoForm = document.getElementById('todoForm'); // 1.2 todoForm
const todoList = document.getElementById('todoList'); // 1.3 todoList
const deadline = document.getElementById('deadline');

// create ID tracker
let id = parseInt(localStorage.getItem("id"));
if (id === null) {
    id = 0;
    localStorage.setItem("id", id);
}

// take care of todo Items
let todoItems = JSON.parse(localStorage.getItem("todoItems"));
if (todoItems === null) {
    todoItems = {};
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

// 2. create Event Listener for adding tasks
function addTask(event) {
    event.preventDefault();
    const newItem = todoInput.value.trim();
    const newDeadline = deadline.value;
    if (newItem === "" || newDeadline === "") {
        alert("Incomplete form...");
        return;
    }
    const newTask = document.createElement('tr');
    newTask.innerHTML = `
    <td><input type="checkbox" class="form-check-input mt-0"></td>
    <td><span>${newItem}</span></td>
    <td><date>${newDeadline}</date></td>
    <td><button class="removeBtn btn btn-danger">Remove</button></td>`;
    todoList.appendChild(newTask);
    todoInput.value = '';
    // keep track of todo Items
    todoItems[id] = {item: newItem, deadline: newDeadline};
    id++;
    localStorage.setItem("id", id);
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
}

todoForm.addEventListener('submit', addTask);

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
})


// 3. create Event Listener for completing tasks
todoList.addEventListener('click', (event) => {
    // check if target it the checkbox
    if (event.target.type === 'checkbox') {
        // get text element next to it
        const todoText = event.target.parentElement.nextElementSibling;
        // toggle completed
        todoText.classList.toggle('completed');
    }
    // check if target is the button
    if (event.target.classList.contains("removeBtn")) {
        event.target.parentElement.parentElement.remove();
    }
})