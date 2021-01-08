const notesList = document.querySelector('#notes-list'),
    noteForm = document.querySelector('#notes-form'),
    input = noteForm.querySelector('input'),
    textarea = noteForm.querySelector('textarea');

let notes = [];

function delNote(event) {
    const span = event.target;
    const div = span.parentNode.parentNode;

    notesList.removeChild(div);

    const cleanNotes = notes.filter(function(element) {
        return element.id !== parseInt(div.id);
    });

    notes = cleanNotes;
    saveNotes(notes);
}

function paintNote(title, noteBody) {
    const div1 = document.createElement('div');
    div1.classList.add('col-md-3');
    div1.classList.add('col-sm-4');
    div1.classList.add('col-xs-6');
    div1.id = notes.length + 1;
    const div2 = document.createElement('div');
    div2.classList.add('note-element');

    const spanTitle = document.createElement('span');
    spanTitle.classList.add('note-title');
    spanTitle.innerText = title;

    const spanCross = document.createElement('span');
    spanCross.classList.add('glyphicon');
    spanCross.classList.add('glyphicon-remove-circle');

    spanCross.addEventListener('click', delNote);

    const divNoteBody = document.createElement('div');
    divNoteBody.classList.add('note-body');
    divNoteBody.innerHTML = noteBody;

    notesList.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(spanTitle);
    div2.appendChild(spanCross);
    div2.appendChild(divNoteBody);
    const notesObj = {
        id: notes.length + 1,
        title: title,
        noteBody: noteBody
    };

    notes.push(notesObj);
    saveNotes(notes);
}

function saveNotes(notesList) {
    localStorage.setItem('Notes', JSON.stringify(notes));
}

function handleSubmit(event) {
    event.preventDefault();

    const title = input.value;
    const noteBody = textarea.value;

    input.value = '';
    textarea.value = '';

    paintNote(title, noteBody);
}

function getNotes() {
    const loadedNotes = localStorage.getItem('Notes');
    const parsedNotes = JSON.parse(loadedNotes);

    if (parsedNotes !== null) {
        parsedNotes.forEach(function(element) {
            paintNote(element.title, element.noteBody);
        });
    }
}

function init() {

    getNotes();
    noteForm.addEventListener('submit', handleSubmit);
}

init();