// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const inputBox = document.getElementById("input-box");
    const taskText = inputBox.value.trim();

    if (taskText) {
        const listContainer = document.getElementById("list-container");

        const li = document.createElement("li");
        li.textContent = taskText;

        // Add event listener to toggle 'checked' class
        li.addEventListener("click", function() {
            li.classList.toggle("checked");
            saveTasks();
        });

        // Create and append delete button to the list item
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };

        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
        inputBox.value = "";
        saveTasks();
    }
}

function saveTasks() {
    const listContainer = document.getElementById("list-container");
    const tasks = [];

    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent,
            checked: li.classList.contains("checked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const listContainer = document.getElementById("list-container");

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.checked) {
            li.classList.add("checked");
        }

        // Add event listener to toggle 'checked' class
        li.addEventListener("click", function() {
            li.classList.toggle("checked");
            saveTasks();
        });

        // Create and append delete button to the list item
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };

        li.appendChild(deleteBtn);
        listContainer.appendChild(li);
    });
}
