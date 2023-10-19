const addBtn = document.querySelector('#addName')
const sortBtn = document.querySelector("#sort")
const todoInput = document.querySelector("#displayInput")
const resultDisplay = document.querySelector("#name-list")
let todoList = JSON.parse(localStorage.getItem('todo-list')) ? JSON.parse(localStorage.getItem('todo-list')) : [];
let tempID = todoList[todoList.length - 1] ? todoList[todoList.length - 1].id + 1 : 1;
let todoDeleteButtons;
let todoCheckBoxes;
let editButtons;

addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (todoInput.value == '') {
        alert('Input is Empty!')
    } else {
        todoList.push({
            id: tempID,
            name: todoInput.value,
            completed: false,
            date: new Date()
        })
        tempID++;
        todoInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todoList));
        renderList();
    }
})

// Sorting the array
sortBtn.addEventListener('click', (event) => {
    event.preventDefault();
    todoList = todoList.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        } else {
            return 1;
        }
        return 0;
    })
    renderList();
})

// Delete button
function deleteButtons(){
    todoDeleteButtons = [...document.querySelectorAll('.delete-btn')];
    todoDeleteButtons.forEach((item)=>{
        item.addEventListener('click',deleteItem)
    })
}
function deleteItem(){
    let startPoint = todoDeleteButtons.indexOf(event.target);
    todoList.splice(startPoint, 1);
    localStorage.setItem('todo-list', JSON.stringify(todoList))
    renderList();
}

function checkBoxes() {
    todoCheckBoxes = [...document.querySelectorAll('.todo-item-checkbox')];
    todoCheckBoxes.forEach((item) => {
        item.addEventListener('click', checkBox)
    })
}
function checkBox() {
    let indexPosition = todoCheckBoxes.indexOf(event.target);
    if (todoList[indexPosition].completed === true) {
        todoList[indexPosition].completed = false;
    } else {
        todoList[indexPosition].completed = true
    }
    renderList();
}

// Edit Button
function editItem() {
    editButtons = [...document.querySelectorAll('.edit-btn')];
    editButtons.forEach((item) => {
        item.addEventListener('click', editTodoItem)
    })
}
function editTodoItem() {
    let newName = prompt('Enter new name:');
    let index = editButtons.indexOf(event.target);
    todoList[index].name = newName;
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    renderList();
}

function renderList(){
    resultDisplay.innerHTML = '';
    todoList.forEach((item)=>{
        if(item.completed === false){
            resultDisplay.innerHTML += 
            `
            <div class="todo-item">
                <input type="checkbox" id="completed${item.id}" class="todo-item-checkbox">
                <p>${item.name}</p>
                <div class="action-btn">
                <button id="edit-btn${item.id}" class="edit-btn">Edit</button>
                <button id="delete-btn${item.id}" class="delete-btn btn3">X</button>
                </div>
            </div>
            `
        } else {
            resultDisplay.innerHTML += 
            `
            <div class="todo-item">
                <input type="checkbox" id="completed${item.id}" class="todo-item-checkbox" checked>
                <p class="checked">${item.name}</p>
                <div class="action-btn">
                <button id="edit-btn${item.id}" class="edit-btn">Edit</button>
                <button id="delete-btn${item.id}" class="delete-btn btn3">X</button>
                </div>
            </div>
            `
        }
    })
    deleteButtons()
    checkBoxes()
    editItem();
}

renderList()