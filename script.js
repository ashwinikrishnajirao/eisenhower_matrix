document.addEventListener("DOMContentLoaded", function () {
    var root = document.querySelector(":root");
    const addButton = document.getElementById("addTask-options");
    const submitButton = document.getElementById("submitButton");
    var themeBtn = document.querySelector(".theme_toogle_btn");
    const modal = document.getElementById("myModal");
    const deleteButton = document.getElementById("deleteButton"); 

    loadTasks();

    addButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    submitButton.addEventListener("click", handleSubmitButtonClick);

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    
    deleteButton.addEventListener("click", function () {
        localStorage.removeItem("tasks");
        window.location.reload();
    });

    themeBtn.addEventListener("click", handleThemeToggle);

    function handleSubmitButtonClick() {
        const selectedOption = document.querySelector('input[name="priority"]:checked');
        if (selectedOption) {
            const selectedValue = selectedOption.value;
            const taskInput = document.getElementById("taskInput").value;
            const taskListId = "tasklist-" + selectedValue;
            const taskList = document.getElementById(taskListId);

            if (taskList) {
                const listItem = createTaskListItem(taskInput);
                taskList.appendChild(listItem);
                saveTasks();
                document.getElementById("taskInput").value = "";
                modal.style.display = "none";
            } else {
                console.log("Task list not found for selected option: " + selectedValue);
            }
        } else {
            console.log("No option selected.");
        }
    }

    function handleThemeToggle() {
        var darkTheme = themeBtn.classList.toggle("dark");
        if (darkTheme) {
            root.style.setProperty("--theme-transition", "1s");
            root.style.setProperty("--primary-color", "#1E1E1E");
            root.style.setProperty("--secondary-color", "#3B3B3B");
            root.style.setProperty("--text-color", "#EAEAEA");
            root.style.setProperty("--task-color", "#3B3B3B");
            root.style.setProperty("--footer-color", "#1E1E1E");
            root.style.setProperty(
                "--theme-btn",
                `url('assets/Light-theme-btn.svg')`
            );
            root.style.setProperty(
                "--container-bg",
                `url('./assets/Dark-empty.svg')`
            );
            root.style.setProperty("--filter", "invert()");
        } else {
            root.style.setProperty("transition", "1s");
            root.style.setProperty("--primary-color", "white");
            root.style.setProperty("--secondary-color", "#1E1E1E");
            root.style.setProperty("--text-color", "black");
            root.style.setProperty("--task-color", "white");
            root.style.setProperty("--footer-color", "#1E1E1E");
            root.style.setProperty(
                "--theme-btn",
                `url('assets/Dark-theme-btn.svg')`
            );
            root.style.setProperty(
                "--container-bg",
                `url('./assets/Light-empty.svg')`
            );
        }

    }

    function createTaskListItem(taskInput) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("round-checkbox");
        listItem.appendChild(checkbox);
        const label = document.createElement("label");
        label.textContent = taskInput;
        listItem.appendChild(label);

        checkbox.addEventListener("change", function () {
            label.style.textDecoration = checkbox.checked ? "line-through" : "none";
            saveTasks();
        });

        return listItem;
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(task => {
                const taskList = document.getElementById("tasklist-" + task.priority);
                if (taskList) {
                    const listItem = createTaskListItem(task.text);
                    taskList.appendChild(listItem);
                    if (task.completed) {
                        listItem.querySelector("input[type='checkbox']").checked = true;
                        listItem.querySelector("label").style.textDecoration = "line-through";
                    }
                }
            });
        }
    }

    function saveTasks() {
        const taskLists = document.querySelectorAll(".matrix-quadrants ul");
        const tasks = [];
        taskLists.forEach(taskList => {
            const priority = taskList.id.split("-")[1];
            taskList.querySelectorAll("li").forEach(taskItem => {
                const task = {
                    priority: priority,
                    text: taskItem.querySelector("label").textContent,
                    completed: taskItem.querySelector("input[type='checkbox']").checked
                };
                tasks.push(task);
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});


   

    




