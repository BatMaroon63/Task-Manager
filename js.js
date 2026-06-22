console.log("JS loaded");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


renderTasks();

let currentTheme = localStorage.getItem("theme") || "style";

document
.getElementById("theme")
.href = `${currentTheme}.css`;

document
.getElementById("title")
.addEventListener("click", toggleTheme);

function toggleTheme(){

    const themeLink =
        document.getElementById("theme");

    if(currentTheme === "style"){

        currentTheme = "style2";

    }else{

        currentTheme = "style";

    }

    themeLink.href =
        `${currentTheme}.css`;

    localStorage.setItem(
        "theme",
        currentTheme
    );
}

// Adding Tasks to the list
function addTask(){

    const taskName =
        document.getElementById("taskName").value.trim();

    const priority =
        document.getElementById("priority").value;

    const error =
        document.getElementById("error");

    if(taskName === ""){
        error.textContent =
            "Please enter task name";
        return;
    }

    error.textContent="";

    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    document.getElementById("taskName").value = "";

    renderTasks();
}

// Rendering the Task to the Table.
function renderTasks(){

    const tbody =
        document.getElementById("taskBody");

    tbody.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "completed"){
        filteredTasks =
            tasks.filter(task => task.completed);
    }

    if(currentFilter === "pending"){
        filteredTasks =
            tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(task => {

        const row = document.createElement("tr");

        row.innerHTML = `
    <td class="${task.completed ? 'completed' : ''}">
        ${task.name}
    </td>

    <td class="${task.priority.toLowerCase()}">
        ${task.priority}
    </td>

    <td>
        ${task.completed ? "Completed" : "Pending"}
    </td>

    <td>
        <button
            class="complete-btn"
            onclick="completeTask(${task.id})">
            ✓
        </button>

        <button
            class="delete-btn"
            onclick="deleteTask(${task.id})">
            🗑
        </button>
    </td>
`;

        tbody.appendChild(row);

    });

    updateStats();
}

// Task Completion number fetched by their ID
function completeTask(id){

    tasks = tasks.map(task => {

        if(task.id === id){
            task.completed = true;
        }

        return task;
    });

    saveTasks();

    renderTasks();
}

// Deleting the Task from the list 
function deleteTask(id){

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    renderTasks();
}

// Updating the Existing Tasks
function updateStats(){

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const pending =
        total - completed;

    document.getElementById("total").textContent =
        total;

    document.getElementById("completed").textContent =
        completed;

    document.getElementById("pending").textContent =
        pending;
}

// filters the task in the appropriate unit
function filterTasks(type){

    currentFilter = type;

    renderTasks();
}

// Saves the Taks in localstorage
function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}