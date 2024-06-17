// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
if (taskList === null) {
    taskList = []};
let nextId = JSON.parse(localStorage.getItem("nextId"));

const formEl = $('#formModal');

const taskTitleEl = $('#task-title');
const taskDueDateEl = $('#task-due-date');
const taskDescEl = $('#task-desc');

const toDoListEl = $('#to-do');
const inProgressListEl = $('#in-progress');
const doneListEl = $('#done');

const toDoCard = $('#todo-cards');
const inProgressCard = $('#in-progress-cards');
const doneCard = $('#done-cards');

let delBtn = $('#del');


// Todo: create a function to generate a unique task id
function generateTaskId() {
    let randomID;
    do {
        randomID = Math.floor(Math.random() * 9999);
    } while (taskList.some(task => task.id === randomID));
    return randomID;
    };

// Todo: create a function to create a task card
function createTaskCard(task) {

    const taskCard = $('<div></div>')
    taskCard.addClass("card my-2");
    taskCard.attr("id", task.id);

        const cardBody = $('<div></div')
        cardBody.addClass("card-body");
        taskCard.append(cardBody);

        const cardHeader = $('<div></div')
        cardHeader.addClass("card-header py-2");
        cardBody.append(cardHeader);

        const cardTitle = $('<h2></h2>').text(task.title);
        cardTitle.addClass("card-title");
        cardHeader.append(cardTitle);

        const cardDate = $('<h6></h6>').text('Due: ' + task.date);
        cardDate.addClass("card-subtitle py-2");
        cardHeader.append(cardDate);3
    
        const cardText = $('<p></p>').text(task.desc);
        cardText.addClass("card-text py-2");
        cardBody.append(cardText);

        const cardFooter = $('<div></div')
        cardFooter.addClass("card-footer py-2");
        cardBody.append(cardFooter);

        const deleteTask = $('<button></button').text('Delete');
        deleteTask.addClass("btn btn-outline-danger");
        deleteTask.attr("id", "del");
        cardFooter.append(deleteTask);
    toDoCard.append(taskCard);
    console.log(dayjs().format('MM/DD/YYYY'));
    if (task.date < dayjs().format('MM/DD/YYYY')) {
        taskCard.addClass("card text-white bg-danger my-2")
    }
    else if (task.date === dayjs().format('MM/DD/YYYY')) {
        taskCard.addClass("card text-white bg-warning my-2")
    }
    else if (task.date > dayjs().format('MM/DD/YYYY')) {
        taskCard.addClass("card bg-light my-2")
    }
};

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if (taskList != null) {
        for (let i = 0; i < taskList.length; ++i) {
            createTaskCard(taskList[i]);
        }
    }

};

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = taskTitleEl.val();
    const taskDueDate = taskDueDateEl.val();
    const taskDesc = taskDescEl.val();
    function Task (title, date, desc, status, id) {
        this.title = taskTitle;
        this.date = taskDueDate;
        this.desc = taskDesc;
        this.status = 'todo';
        this.id = generateTaskId();
    };
    const task = new Task(taskTitle, taskDueDate, taskDesc, 'todo', generateTaskId());
    console.log(taskList);
    typeof(taskList);
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    createTaskCard(task);
    console.log(task);
    taskTitleEl.val('');
    taskDueDateEl.val('');
    taskDescEl.val('');

};

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const clickedBtn = $(event.target);
    cardId = Number(clickedBtn.closest('.card').attr("id"));
    console.log(cardId);
    index = taskList.findIndex(task => task.id === cardId);
    console.log(index);
    taskList.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    clickedBtn.closest('.card').remove();
};

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
};

// Todo: when the page loads, (1.) render the task list, (2.) add event listeners, (3.) make lanes droppable, and (4.) make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

// Use jQuery syntax .on and 'submit' to handle the formEl submission with corresponding function.
    formEl.on('submit', handleAddTask);
    $(document).on('click', '#del', handleDeleteTask);

// (4.) Datepicker functionality
    $(function () {
        $(taskDueDateEl).datepicker({
// This toggles drop down selection lists for month and year. 'false' turns off.
            changeMonth: true,
            changeYear: true,
        });
    });

    $('.sortable').sortable({
        connectWith:".sortable",
    });

    $(toDoListEl, inProgressListEl, doneListEl).droppable({
        accept:".sortable",
        drop: handleDrop
    });

});
