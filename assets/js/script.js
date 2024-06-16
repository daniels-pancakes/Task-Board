// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const formEl = $('#formModal');

const taskTitleEl = $('#task-title');
const taskDueDateEl = $('#task-due-date');
const taskDescEl = $('#task-desc');

const toDoListEl = $('#to-do');
const inProgressListEl = $('#in-progress');
const donelistEl = $('#done');

// Todo: create a function to generate a unique task id
function generateTaskId() {};
//     const randomID = Math.floor(Math.random() * 9999);
//     if  (taskList === null) {
//         taskList = [];
//         const randomID = Math.floor(Math.random() * 9999);
//         console.log(typeof(taskList));
//         taskList.push(randomID);
//         localStorage.setItem('tasks', taskList);
//     }
//     else if (taskList.indexOf(randomID) > -1) {
//         const randomID = Math.floor(Math.random() * 9999);
//         taskList.push(randomID);
//         localStorage.setItem('tasks', taskList);
//         return randomID;
//     } else {
//     taskList.push(randomID);
//     localStorage.setItem(taskList);
//     return randomID;
//     }
// }
// console.log(generateTaskId());

// Todo: create a function to create a task card
function createTaskCard(task) {

    
};

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

};

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = taskTitleEl.val();
    const taskDueDate = taskDueDateEl.val();
    const taskDesc = taskDescEl.val();
    function Task (title, date, desc) {
        this.title = taskTitle;
        this.date = taskDueDate;
        this.desc = taskDesc;
    };
    const newTask = new Task(taskTitle, taskDueDate, taskDesc);
    console.log(newTask);
    taskTitleEl.val('');
    taskDueDateEl.val('');
    taskDescEl.val('');

};

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

};

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

};

// Todo: when the page loads, (1.) render the task list, (2.) add event listeners, (3.) make lanes droppable, and (4.) make the due date field a date picker
$(document).ready(function () {
    renderTaskList()

// Use jQuery syntax .on and 'submit' to handle the formEl submission with corresponding function.
    formEl.on('submit', handleAddTask);

// (4.) Datepicker functionality
    $(function () {
        $(taskDueDateEl).datepicker({
// This toggles drop down selection lists for month and year. 'false' turns off.
            changeMonth: true,
            changeYear: true,
        });
    });

    $(function() {
    toDoList = $('#to-do').sortable({

    });
    inProgressList = $('#in-progress').sortable({

    });
    donelist = $('#done').sortable({

    });
});

});
