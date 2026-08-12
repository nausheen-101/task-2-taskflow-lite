// ======================================
// Render Tasks
// ======================================

export function renderTaskList(tasks, filter = "all") {

    const taskList = document.getElementById("taskList");
    const emptyState = document.getElementById("emptyState");
    const taskCounter = document.getElementById("taskCounter");

    taskList.innerHTML = "";

    // Update Counter
    const completedCount = tasks.filter(task => task.completed).length;

    taskCounter.textContent =
        `Tasks : ${tasks.length} | Completed : ${completedCount}`;

    // Filter Tasks
    let filteredTasks = tasks;

    if (filter === "active") {

        filteredTasks = tasks.filter(task => !task.completed);

    } else if (filter === "completed") {

        filteredTasks = tasks.filter(task => task.completed);

    }

    // Empty State
    if (filteredTasks.length === 0) {

        emptyState.style.display = "block";

        return;

    }

    emptyState.style.display = "none";

    // Render Tasks
    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        li.dataset.id = task.id;

        li.innerHTML = `

            <div class="task-item">

                <label class="task-left">

                    <input
                        type="checkbox"
                        class="toggleTask"
                        ${task.completed ? "checked" : ""}>

                    <span class="${task.completed ? "completed" : ""}">
                        ${task.text}
                    </span>

                </label>

                <button class="deleteTask">
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}