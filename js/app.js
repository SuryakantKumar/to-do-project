// select the elements

const list = document.getElementById("list");
const input = document.getElementById("input");


// Events names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


// variables

let LIST = [], id = 0;


// get item from local storage

let data = localStorage.getItem("TODO");


// check if data is not empty

if (data) {
    LIST = JSON.parse(data);
    id = list.length;       // set the id to the last one in the list
    loadList(LIST);         // load the list to the user interface

} else {
    LIST = [];
    id = 0;
}


// load list item to user interface

function loadList(array) {
    array.forEach(function (item) {
        addList(item.name, item.id, item.done, item.trash);
    });
}


// add to-do function

function addList(toDo, id, done, trash) {

    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
                    <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fas fa-times de" job="delete" id="${id}"></i>
                    </li>
                 `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}


// add an item to the list user the enter key

document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;

        // checking if input is not empty
        if (toDo) {

            addList(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });

            // add the item to local storage

            localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// complete to do

function completeList(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do

function removeList(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}


// target the items created dynamically

list.addEventListener("click", function (event) {
    const element = event.target;       // return clicked element inside list

    const elementJob = element.attributes.job.value;        // complete or delete

    if (elementJob == "complete") {
        completeList(element);

    } else if (elementJob == "delete") {
        removeList(element);
    }

    // add the item to local storage

    localStorage.setItem("TODO", JSON.stringify(LIST));
});
