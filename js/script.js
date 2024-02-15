//Write down our classes to variables
let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

//An empty array to store input data
let todoList = [];

//Obtain data from localStorage and transform its to an array
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    //After getting data to display information with displayMessages function()
    displayMessages();
}

addButton.addEventListener('click', function() {
    if (!addMessage.value) return;
    //Object for our last message
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

//Add into todoList-array every new message from newTodo-object
todoList.push(newTodo);  
displayMessages() //to call every time when the add button is pressed
localStorage.setItem('todo', JSON.stringify(todoList)); //to store data as a String 
addMessage.value = '';
});

//Function to display our messages(to list every todoList object and display it)
function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) todo.innerHTML = '';
    //forEach accepts three parameters(object, index, array. We use just two parameters)
    todoList.forEach(function(item, index) {
        //create a list with user input
        displayMessage += `
        <li>
          <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}> 
          <label for='item_${index}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        //Add into todo a message from the user with InnerHTML property
        todo.innerHTML = displayMessage;
    });
}

//Event to look where we put a checkbox
todo.addEventListener('change', function(event) {
    let idInput = (event.target.getAttribute('id'));
    //Search a label with the for value
    let forLabel = todo.querySelector('[for='+ idInput +']');
    //To get text for label(innerHTML)
    let valueLabel = forLabel.innerHTML;

    //look for this value into todoList
    todoList.forEach(function(item){
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

//Process a Context Menu
todo.addEventListener('contextmenu', function(event) {
    //Call off a standart browser behavior
    event.preventDefault();
    todoList.forEach(function(item, index) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey) {
                todoList.splice(index, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});
