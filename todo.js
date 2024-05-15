// 1. get elements by ID
const todoInput = document.getElementById('todoInput'); // 1.1 todoInput
const taskButton = document.getElementById('taskButton'); // 1.2 taskButton
const todoList = document.getElementById('todoList'); // 1.3 todoList

// 2. create Event Listener for adding tasks
function addTask() {
    const newItem = todoInput.value.trim();
    if (newItem === "") {
        alert("Empty item...");
        return;
    }
    const newTask = document.createElement('li');
    newTask.innerHTML = `
    <input type="checkbox">
    <span>${newItem}</span>
    <button class="removeBtn">Remove</button>`;
    todoList.appendChild(newTask);
    todoInput.value = '';
}

taskButton.addEventListener('click', addTask);

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
        const todoText = event.target.nextElementSibling;
        // toggle completed
        todoText.classList.toggle('completed');
    }
    // check if target is the button
    if (event.target.classList.contains("removeBtn")) {
        event.target.parentElement.remove();
    }
})