const todoForm = document.querySelector('form'),
    input = todoForm.querySelector('input'),
    submitBtn = document.querySelector('form button'),
    taskList = document.querySelector('#task-list');

let toDos = [];

function handleClick(event) {
    console.log('some task clicked');
    const li = event.target;

    taskList.removeChild(li);

    const cleantoDos = toDos.filter(function(element) {
        return element.id !== parseInt(li.id);
    });

    toDos = cleantoDos;
    saveTasks(toDos);
}


function paintTask(task) {
    const li = document.createElement('li');
    li.id = toDos.length + 1;
    li.innerText = task;
    taskList.appendChild(li);

    const taskObj = {
        text: task,
        id: toDos.length + 1
    };

    toDos.push(taskObj);
    saveTasks(toDos);

}

function saveTasks(toDos) {
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

function handleSubmit(event) {
    event.preventDefault();

    const newTask = input.value;

    input.value = '';
    paintTask(newTask);
}

function getTasks() {
    const loadedtoDos = localStorage.getItem('toDos');

    const parsedToDos = JSON.parse(loadedtoDos)

    if (parsedToDos !== null) {
        parsedToDos.forEach(function(toDo) {
            paintTask(toDo.text);
        });
    }
}

function init() {

    getTasks();
    console.log(input);
    console.log(todoForm);
    console.log(submitBtn);
    todoForm.addEventListener('submit', handleSubmit);
    taskList.addEventListener('click', handleClick);
}

init();