//Write down our classes to variables
let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

//An empty array to store input data
let todoList = [];

addButton.addEventListener('click', function() {
    //Object for our last message
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

//Add into todoList-array every new message from newTodo-object
todoList.push(newTodo);  
displayMessages() //to call every time when the add button is pressed 
});

//Function to display our messages(to list every todoList object and display it)
function displayMessages() {
    //forEach accepts three parameters(object, index, array. We use just two parameters)
    todoList.forEach(function(item, index) {
        console.log(item);
    });
}
