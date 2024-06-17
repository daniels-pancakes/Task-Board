// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
if (taskList === null) {
    taskList = []};

// I did not find a use for the below starter code. Achieved complete functionality without the need for use.
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
// do while loop will generate a randomID until it gets one that is not already in the taskList. Accounts for the unlikely event of duplicates.
    do {
        randomID = Math.floor(Math.random() * 9999);
    } while (taskList.some(task => task.id === randomID));
    return randomID;
    };

// Create a function to create a task card
function createTaskCard(task) {

// Task card
    const taskCard = $('<div></div>')
    taskCard.addClass("card my-2");
    taskCard.attr("id", task.id);

// Task body
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

// The following code handles color styling based on the date. If the date is overdue it will assign danger coloring. If today's date is the same, it will assign warning coloring. If it is due in advance it will assign a coloring of 
        if (task.status==='todo-cards') {

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
            toDoCard.append(taskCard)
        }
        else if (task.status==='in-progress-cards') {

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
            inProgressCard.append(taskCard)}

        else if (task.status==='done-cards') {
            taskCard.attr("class", "text-dark bg-light my-2")
            taskCard.attr("class", "card bg-light my-2")
            deleteTask.attr("class", "btn btn-outline-dark")
            doneCard.append(taskCard)
            };




};

// Create a function to render the task list and make cards draggable
function renderTaskList() {
    if (taskList != null) {
        for (let i = 0; i < taskList.length; ++i) {
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
    index = taskList.findIndex(task => task.id === cardId);
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
    taskList[index].status = cardLane;
    console.log(ui.helper[0]);

// I've followed a similar pattern here for changing my card colors when they are dropped into new lanes. The main difference being use of ui.helper and DOM traversal to point to the correct elements for styling.
    if (cardLane ==='done-cards') {
        $(ui.helper[0]).attr("class", "card text-dark bg-light my-2");
        $(ui.helper[0]).children().children('.card-footer').children('.btn').attr("class", "btn btn-outline-dark");
    }
    else if (cardLane ==='in-progress-cards' || 'todo-cards') {
        if (taskList[index].date < dayjs().format('MM/DD/YYYY')) {
            $(ui.helper[0]).attr("class", "card text-white bg-danger my-2");
            $(ui.helper[0]).children().children('.card-footer').children('.btn').attr("class", "btn btn-outline-light");
        }
        else if (taskList[index].date === dayjs().format('MM/DD/YYYY')) {
            $(ui.helper[0]).attr("class", "card text-dark bg-warning my-2");
            $(ui.helper[0]).children().children('.card-footer').children('.btn').attr("class", "btn btn-outline-dark");
        }
        else if (taskList[index].date > dayjs().format('MM/DD/YYYY')) {
            $(ui.helper[0]).attr("class", "card text-dark bg-light my-2");
            $(ui.helper[0]).children().children('.card-footer').children('.btn').attr("class", "btn btn-outline-dark");
        }
    };
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

// When the page loads, (1.) render the task list, (2.) add event listeners, (3.) make lanes droppable, and (4.) make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

// Use jQuery syntax .on and 'submit' to handle the formEl submission with corresponding function.
    formEl.on('submit', handleAddTask);
    $(document).on('click', '#del', handleDeleteTask);

// Datepicker functionality
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
