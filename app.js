const inputBox = document.querySelector("input");
const addBtn = document.querySelector("#add-button");
const listContainer = document.querySelector(".list-container");
const allBtn = document.querySelector(".all");
const completedBtn = document.querySelector(".completed");
const activeBtn = document.querySelector(".active");
const deleteCompletedBtn = document.querySelector(".delete-all-complete");
const body = document.querySelector('body');

let arrDb = [];
let currentFilter = 'all';

/**functions */
function dataValidation(data, arrDb) {
    if (data === '') {
        customAlert('enterTask');
        // alert('Enter a task');
        return false;
    }
    // arrDb.forEach((item, index) => {
    //     if (item[index].taskName === data) {
    //         alert('Task is Present');
    //         return false;
    //     }
    // });
    for (let i = 0; i < arrDb.length; i++) {
        if (arrDb[i].taskName.toLowerCase() === data.toLowerCase()) {
            // alert('Task is Present');
            customAlert('taskPresent');
            return false;
        }
    }
    customAlert('success');
    return true;

}

function addTask() {
    let data = inputBox.value.trim();
    if (dataValidation(data, arrDb)) {
        arrDb.push(
            {
                taskName: data,
                isCompleted: false
            }
        );
        renderCard(arrDb)

    }
    inputBox.value = '';

}

function renderCard(arrDb) {
    listContainer.innerHTML = '';
    arrDb.forEach((item, index) => {
        let cardElement = createCardElement(item, index);
        listContainer.appendChild(cardElement);
    })
    console.log(arrDb)
}

function createCardElement(item, index) {
    const card = document.createElement("div");
    card.className = "item w-full h-12 bg-white rounded-lg flex items-center justify-between mb-2 p-3 shadow-sm transition-all duration-300 ease-in";

    const taskText = document.createElement("p");
    taskText.className = `task-text text-gray-500 w-[90%] h-full pe-1 font-semibold overflow-x-hidden overflow-y-auto ${item.isCompleted ? 'line-through ' : ''} ${item.taskName.length > 70 ? 'break-all' : ''}`;

    // taskText.className = `task-text text-gray-500 w-[90%] h-full pe-1 font-semibold overflow-x-hidden overflow-y-auto ${item.isCompleted ? 'line-through' : 'none'} ${item.length > 79 ? 'break-all' : ''}`;
    taskText.textContent = item.taskName;
    taskText.setAttribute('data-complete', 'active');
    card.appendChild(taskText);

    const buttons = document.createElement("div");
    buttons.className = "buttons w-[10%] flex gap-2 ";
    card.appendChild(buttons);
    const taskAccept = document.createElement("button");
    taskAccept.className = "task-accept w-7 h-7 bg-[#f3f4f5] text-[#6aaf8e] rounded-sm hover:bg-[#cafce4] transition-all duration-100 ease-in cursor-pointer";
    taskAccept.innerHTML = `<i class="fa-solid fa-check text-sm"></i>`;


    buttons.appendChild(taskAccept);

    const taskDelete = document.createElement("button");
    taskDelete.className = "task-delete w-7 h-7 bg-[#f3f5f7] text-[#ff6867] rounded-sm hover:bg-[#ffc5c4] transition-all duration-100 ease-in cursor-pointer";
    taskDelete.innerHTML = `<i class="fa-solid fa-trash text-sm"></i>`;


    taskAccept.addEventListener('click', () => taskComplete(index));
    taskDelete.addEventListener('click', () => taskDeleteFunc(index)); // renamed to avoid conflict with the button variable

    buttons.appendChild(taskDelete);
    return card;
}
// function taskComplete(index) {
//     arrDb[index].isCompleted = !arrDb[index].isCompleted;
//     renderCard(arrDb);
//     filter(currentFilter);
// }

// function taskDeleteFunc(index) {
//     arrDb.splice(index, 1);
//     renderCard(arrDb);
//     filter(currentFilter);
// }

function taskComplete(index) {
    arrDb[index].isCompleted = !arrDb[index].isCompleted;
    filter(currentFilter); // only this
    customAlert('taskComplete');
}

function taskDeleteFunc(index) {
    arrDb.splice(index, 1);
    filter(currentFilter); // only this
}


function filter(filterType) {
    currentFilter = filterType;

    if (filterType === 'all') {
        renderCard(arrDb);
    } else if (filterType === 'active') {
        const active = arrDb.filter(item => !item.isCompleted);
        renderCard(active);
    } else if (filterType === 'completed') {
        const completed = arrDb.filter(item => item.isCompleted);
        renderCard(completed);
    } else if (filterType === 'delete') {
        arrDb = arrDb.filter(item => !item.isCompleted);
        renderCard(arrDb);
    }
}

/**alarts */
function customAlert(alartType) {
    alartType.innerHTML = '';
    const alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.classList = `flex items-center max-w-sm p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 absolute top-5 right-5 z-50`;
    if (alartType === 'enterTask') {
        alert.classList = `flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 absolute top-5 right-5 z-50`;
        alert.innerHTML = `
        <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">Warning alert!</span> Add a task.
        </div>
        
        `
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 2000);

    }
    if (alartType === 'taskPresent') {
        alert.innerHTML = `
        <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 
            1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 
            1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">Info alert!</span> Task already present.
        </div>
    `;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 2000);
    }

    if (alartType === 'success') {
        alert.classList = `flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 absolute top-5 right-5 z-50`;
        alert.innerHTML = `
         <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
            <span class="font-medium">Success alert!</span> Task Added.
        </div>
       `
        document.body.appendChild(alert);

        setTimeout(() => {
            alert.remove();
        }, 2000);
    }


}


// 
/**Events */
addBtn.addEventListener('click', () => {
    addTask()
})

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask()
    }
})

allBtn.addEventListener('click', () => {
    filter('all');
});

completedBtn.addEventListener('click', () => {
    filter('completed');
});

activeBtn.addEventListener('click', () => {
    filter('active');
});

deleteCompletedBtn.addEventListener('click', () => {
    filter('delete');
});

