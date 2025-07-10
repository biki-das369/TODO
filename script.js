/**Addt task button click */
const addBtn = document.querySelector("#add-button");
const inputBox = document.querySelector("input");
const listContainer = document.querySelector(".list-container");

/**filter Buttons init */
const buttnContainer = document.querySelector('.buttons');
const all = document.querySelector(".all");
const completed = document.querySelector('.completed');
const pending = document.querySelector('.pending');
const deleteCompleted = document.querySelector('.delete-all-complete')
/**------------------- */

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addBtn.click();
    }
})

addBtn.addEventListener("click", () => {
    let inpuText = inputBox.value.trim();
    if (inpuText === '') {
        alert("add some task")
    } else {
        let card = document.createElement("div");

        card.className = "item w-full h-11 bg-white rounded-lg flex items-center justify-between mb-2 flex p-3 shadow-sm transition-all duration-300 ease-in transform opacity-0 scale-95  overflow-hidden "
        card.innerHTML = `
                <p  class="task-text text-gray-500 w-[90%] pe-1 font-semibold overflow-x-hidden" data-complete="active">${inpuText}</p>
                <div class="buttons w-[10%] flex gap-2 ">
                    <button onClick ="taskComplete" class="task-accept w-7 h-7 bg-[#f3f4f5] text-[#6aaf8e] rounded-sm hover:bg-[#cafce4] transition-all duration-100 ease-in cursor-pointer"><i class="fa-solid fa-check text-sm"></i></button>
                    <button onClick ="taskDelete" class="task-delete w-7 h-7 bg-[#f3f5f7] text-[#ff6867] rounded-sm hover:bg-[#ffc5c4] transition-all duration-100 ease-in cursor-pointer"><i class="fa-solid fa-trash text-sm"></i></button>
                </div>
        `;

        listContainer.appendChild(card);
        
        setTimeout(() => {
            card.classList.remove('opacity-0', 'scale-95');
            card.classList.add('opacity-100', 'scale-100');
        }, 10);

        document.querySelector("input").value = '';

        /**for filter button visibility */
        buttnContainer.classList.add('visible');

        /** task complete and delete*/
        let taskText = card.querySelector(".task-text");
        const taskAccept = card.querySelector(".task-accept");
        const taskDelete = card.querySelector('.task-delete');

        /**task complete */
        taskAccept.addEventListener("click", () => {
            taskText.classList.toggle("line-through");
            taskText.classList.toggle("text-gray-500");

            /**filter */
            const isComplete = taskText.classList.contains('line-through');

            taskText.setAttribute('data-complete', isComplete ? 'taskcompleted' : 'active');

        })

        /**task delete */
        // taskDelete.addEventListener('click', () => {
        //     card.remove();

        // })

        taskDelete.addEventListener("click", () => {
            card.classList.add('opacity-0', 'scale-90');
            setTimeout(() => {
                card.remove();
            }, 300); // match with duration
        });

    }
})

/**filter buttons */

/**all */
all.addEventListener('click', () => {
    const task = document.querySelectorAll('.task-text');
    task.forEach((task) => {
        task.closest('.item').style.display = "flex";
    });
})

/**task completed */
completed.addEventListener('click', () => {
    const task = document.querySelectorAll('.task-text');
    task.forEach(task => {
        const isDone = task.getAttribute('data-complete') === 'taskcompleted';
        task.closest('.item').style.display = isDone ? 'flex' : 'none';
    })
})

/**task pending */
pending.addEventListener('click', () => {
    const task = document.querySelectorAll('.task-text');
    task.forEach(task => {
        if (task.getAttribute('data-complete') === 'active') {
            task.closest('.item').style.display = 'flex'
        } else {
            task.closest('.item').style.display = 'none'
        }
    })

})

/** clear completed */

deleteCompleted.addEventListener('click', () => {
    const task = document.querySelectorAll('.task-text');

    task.forEach(task => {
        const isDone = task.getAttribute('data-complete') === 'taskcompleted';

        //  task.closest('.item') = isDone ? remove() : alert("nothing For delete");

        if (isDone) {
            task.closest('.item').remove()
        }

    });
})

