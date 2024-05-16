// 1. get elements by ID
const todoForm = document.getElementById('todoForm'); // 1.2 todoForm
const todoList = document.getElementById('todoList'); // 1.3 todoList

function displayTodo(id, item, deadline) {
    const newTask = document.createElement('tr');
    newTask.innerHTML = `
    <td><input type="checkbox" class="form-check-input mt-0"></td>
    <td><span>${item}</span></td>
    <td><date>${deadline}</date></td>
    <td><button class="removeBtn btn btn-danger" value="${id}">Remove</button></td>`;
    todoList.appendChild(newTask);
}

function removeTodo(id) {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    localStorage.setItem("todos", JSON.stringify(filteredTodos))    
}

const todos = JSON.parse(localStorage.getItem("todos"))
// Optional chaining
if(todos?.length) {
    for (const todo of todos) {
        displayTodo(todo.id, todo.item, todo.deadline)
     }
}

// When we submit, get localStorage -> update it -> write back
function saveTask(item, deadline) {
    // read todos from localStorage
    const todosFromLS = localStorage.getItem("todos")
    let todos = JSON.parse(todosFromLS)
    console.log("before adding", todos)
    // check if we have todos already saved
    if(!todos) {
        todos = []
    }
    // update todos
    const lastItem = todos[todos.length - 1]
    console.log("lastItem", lastItem)
    let id = !lastItem ? 1 : lastItem.id + 1
    console.log("id", id)

    todos.push({id, item, deadline})
    console.log("after adding", todos)
    // write them back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos))
    return id
}

// 2. create Event Listener for adding tasks
function addTask(event) {
    event.preventDefault();

    const form = event.target
    const formData = new FormData(form)
    const {item, deadline} = Object.fromEntries(formData) 
    
    if (item === "" || deadline === "") {
        alert("Incomplete form...");
        return;
    }
    const id = saveTask(item, deadline)
    displayTodo(id, item, deadline)
    form.reset()
    // keep track of todo Items
}

todoForm.addEventListener('submit', addTask);


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
        const id = parseInt(event.target.value)
        removeTodo(id)
        event.target.parentElement.parentElement.remove();
    }
})
