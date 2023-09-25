function savetoLocalstorage() {
    const taskList = document.getElementById('taskList')
    const tasks = []

    for (i = 0; i < taskList.children.length; i++) {
        let taskText = taskList.children[i].textContent.replace('Delete', '').trim()
        let isDone = taskList.children[i].classList.contains('done')

        tasks.push({
            text: taskText,
            done: isDone
        })
    }

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasksfromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || []
    tasks.forEach(task => addTask(task.text, task.done))
}

// This will always keep displaying all the task items stored in the local storage
window.onload = loadTasksfromLocalStorage()


function addTask(taskText, isDone = false) {
    const taskInput = document.getElementById('taskInput')
    const taskList = document.getElementById('taskList')

    const text = taskText || taskInput.value
    // Applying if condition to prevent creation of empty task item
    if (text.trim() === '') {
        alert('Please enter a task')
        return;
    }

    //  Creating an task item and assigning it with task
    const li = document.createElement('li');
    li.textContent = text;

    if (isDone) {
        li.classList.add('done')
    }

    // Adding a delete button for each task
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.onclick = function () {
        taskList.removeChild(li)
        // saving all the remaining list elements to local storage 
        savetoLocalstorage();
    }

    li.appendChild(deleteBtn)
    taskList.appendChild(li)

    // saving all the task list elements to localstorage when new element is added 
    li.addEventListener('click', function () {
        li.classList.toggle('done');
        savetoLocalstorage();
    })
    savetoLocalstorage();

    // clearing input field for next task
    taskInput.value = ''
}



function clearAllTasks() {
    if (!confirm('Are you sure you want to clear all tasks?')) {
        return;
    }
    const taskList = document.getElementById('taskList')

    taskList.innerHTML = ''
    localStorage.removeItem('tasks')
}

function filterTask(criteria) {
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(task => {
        switch (criteria) {
            case 'all':
                task.style.display = ''
                break;
            case 'active':
                if (task.classList.contains('done')) {
                    task.style.display = 'None'
                } else {
                    task.style.display = ''
                }
                break;
            case 'complete':
                if (task.classList.contains('done')) {
                    task.style.display = ''
                } else {
                    task.style.display = 'None'
                }
                break;
        }
    })
}