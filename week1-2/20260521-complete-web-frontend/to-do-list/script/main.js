const addButton = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const ongoingTasks = document.getElementById('ongoingTasks');
const taskHistory = document.getElementById('taskHistory');

let ongoingTasksList = [];
let taskHistoryList = [];

function addItem(textInput) {
    if (!textInput) return;

    ongoingTasksList.push({
        id: Date.now().toString(),
        text: textInput,
        status: 'ongoing'
    });

    displayTasks();
}

function completeTask(id) {
    const taskIndex = ongoingTasksList.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        const task = ongoingTasksList.splice(taskIndex, 1)[0];
        task.status = 'completed';
        taskHistoryList.push(task);
        displayTasks();
    }
}

function deleteTask(id, isOngoing) {
    if (isOngoing) {
        const taskIndex = ongoingTasksList.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            const task = ongoingTasksList.splice(taskIndex, 1)[0];
            task.status = 'deleted';
            taskHistoryList.push(task);
        }
    } else {
        const taskIndex = taskHistoryList.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            taskHistoryList.splice(taskIndex, 1);
        }
    }
    displayTasks();
}

function clearHistory() {
    taskHistoryList = [];
    displayTasks();
}

function displayTasks() {
    const taskListContainer = document.querySelector('.task-list');

    let emptyMessage = document.getElementById('emptyMessage');
    if (!emptyMessage) {
        emptyMessage = document.createElement('div');
        emptyMessage.id = 'emptyMessage';
        emptyMessage.className = 'empty-message';
        emptyMessage.innerHTML = 'No Tasks, </br> Go do something fun';
        taskListContainer.appendChild(emptyMessage);
    }

    if (ongoingTasksList.length === 0 && taskHistoryList.length === 0) {
        taskListContainer.classList.add('empty-state');
        emptyMessage.style.display = 'block';
        ongoingTasks.style.display = 'none';
        taskHistory.style.display = 'none';
    } else {
        taskListContainer.classList.remove('empty-state');
        emptyMessage.style.display = 'none';
        ongoingTasks.style.display = 'block';
        taskHistory.style.display = 'block';

        renderOngoingTasks();
        renderTaskHistory();
    }
}

function renderOngoingTasks() {
    ongoingTasks.innerHTML = '';

    if (ongoingTasksList.length > 0) {
        const title = document.createElement('h3');
        title.textContent = `Ongoing Tasks (${ongoingTasksList.length})`;
        ongoingTasks.appendChild(title);

        const ul = document.createElement('ul');
        ul.className = 'tasks';

        ongoingTasksList.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';

            li.innerHTML = `
                <span class="task-text">${escapeHTML(task.text)}</span>
                <div class="task-actions">
                    <button class="complete-btn" title="Complete Task" onclick="completeTask('${task.id}')">✓</button>
                    <button class="delete-btn" title="Delete Task" onclick="deleteTask('${task.id}', true)">🗑</button>
                </div>
            `;
            ul.appendChild(li);
        });
        ongoingTasks.appendChild(ul);
    }
}

function renderTaskHistory() {
    taskHistory.innerHTML = '';

    if (taskHistoryList.length > 0) {
        const title = document.createElement('h3');
        title.textContent = `History (${taskHistoryList.length})`;
        taskHistory.appendChild(title);

        const ul = document.createElement('ul');
        ul.className = 'tasks';

        taskHistoryList.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.status}`;

            li.innerHTML = `
                <span class="task-text">${escapeHTML(task.text)} (${task.status})</span>
                <div class="task-actions">
                    <button class="delete-btn" title="Delete permanently" onclick="deleteTask('${task.id}', false)">🗑</button>
                </div>
            `;
            ul.appendChild(li);
        });
        taskHistory.appendChild(ul);

        const clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear History';
        clearBtn.style.marginTop = '10px';
        clearBtn.onclick = clearHistory;
        taskHistory.appendChild(clearBtn);
    }
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

addButton.addEventListener('click', function () {
    const text = taskInput.value.trim();
    if (text) {
        addItem(text);
        taskInput.value = '';
        taskInput.focus();
    }
});

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const text = taskInput.value.trim();
        if (text) {
            addItem(text);
            taskInput.value = '';
            taskInput.focus();
        }
    }
});

displayTasks();