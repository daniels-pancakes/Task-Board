// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const randomID = Math.floor(Math.random() * 9999);
    if  (taskList === null) {
        taskList = [];
        const randomID = Math.floor(Math.random() * 9999);
        console.log(typeof(taskList));
        taskList.push(randomID);
        localStorage.setItem('tasks', taskList);
    }
    else if (taskList.indexOf(randomID) > -1) {
        const randomID = Math.floor(Math.random() * 9999);
        taskList.push(randomID);
        localStorage.setItem('tasks', taskList);
        return randomID;
    } else {
    taskList.push(randomID);
    localStorage.setItem(taskList);
    return randomID;
    }
}
console.log(generateTaskId());

// Todo: create a function to create a task card
function createTaskCard(task) {
    

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList()
});
