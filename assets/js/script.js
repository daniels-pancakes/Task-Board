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


// Create a function to generate a unique task id
function generateTaskId() {
    let randomID;
    do {
        randomID = Math.floor(Math.random() * 9999);
    } while (taskList.some(task => task.id === randomID));
    return randomID;
    };

// Create a function to create a task card
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
        cardHeader.append(cardDate);
    
        const cardText = $('<p></p>').text(task.desc);
        cardText.addClass("card-text py-4");
        cardBody.append(cardText);

        const cardFooter = $('<div></div');
        cardFooter.addClass("card-footer py-2");
        cardBody.append(cardFooter);

        const deleteTask = $('<button></button').text('Delete');
        deleteTask.addClass("btn btn-outline-dark");
        deleteTask.attr("id", "del");
        cardFooter.append(deleteTask);

        if (task.status==='todo-cards') {
            toDoCard.append(taskCard)
        }
        else if (task.status==='in-progress-cards') {
            inProgressCard.append(taskCard)}
        else if (task.status==='done-cards') {
            doneCard.append(taskCard)
            };

    if (task.date < dayjs().format('MM/DD/YYYY')) {
        taskCard.addClass("card text-white bg-danger my-2")
        deleteTask.attr("class", "btn btn-outline-light")
    }
    else if (task.date === dayjs().format('MM/DD/YYYY')) {
        taskCard.addClass("card text-dark bg-warning my-2")
        deleteTask.attr("class", "btn btn-outline-dark")
    }
    else if (task.date > dayjs().format('MM/DD/YYYY')) {
        taskCard.addClass("card bg-light my-2")
    }


};

// Create a function to render the task list and make cards draggable
function renderTaskList() {
    if (taskList != null) {
        for (let i = 0; i < taskList.length; ++i) {
            console.log(taskList[i].status);
            createTaskCard(taskList[i]);
        }
    }
};

// Create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const taskTitle = taskTitleEl.val();
    const taskDueDate = taskDueDateEl.val();
    const taskDesc = taskDescEl.val();
    function Task (title, date, desc, status, id) {
        this.title = taskTitle;
        this.date = taskDueDate;
        this.desc = taskDesc;
        this.status = 'todo-cards';
        this.id = generateTaskId();
    };
    const task = new Task(taskTitle, taskDueDate, taskDesc, 'todo-cards', generateTaskId());
    taskList.push(task);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    createTaskCard(task);
    taskTitleEl.val('');
    taskDueDateEl.val('');
    taskDescEl.val('');
};

// Create a function to handle deleting a task
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

// Create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
// ui.helper points to the item that was dropped
    const dropCard = ui.helper;
// this.attr('id') points to the lane receiving the dropped card
    const cardLane = $(this).attr('id');
    cardId = Number(dropCard.attr('id'));
    index = taskList.findIndex(task => task.id === cardId);
    console.log('Status before ' + taskList[index].status);
    taskList[index].status = cardLane;
    console.log('Status after' + taskList[index].status);
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

// When the page loads, (1.) render the task list, (2.) add event listeners, (3.) make lanes droppable, and (4.) make the due date field a date picker
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
    }).disableSelection();

    // I split this up into 3 functions. It was not working when I had them all on one line separated by commas.
    $(toDoCard).droppable({
        accept:".card",
        drop: handleDrop
    });
    $(inProgressCard).droppable({
        accept:".card",
        drop: handleDrop
    });
    $(doneCard).droppable({
        accept:".card",
        drop: handleDrop
    });
});
