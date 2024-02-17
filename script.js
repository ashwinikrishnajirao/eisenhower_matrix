document.addEventListener("DOMContentLoaded", function () {
    // Get references to the necessary elements
    var root = document.querySelector(":root");
    const addButton = document.getElementById("addTask-options");
    const optionsContainer = document.getElementById("optionsContainer");
    const textBoxContainer = document.getElementById("textBoxContainer");
    const submitButton = document.getElementById("submitButton");
    var themeBtn = document.querySelector(".theme_toogle_btn");
    const modal = document.getElementById("myModal");


    // Add a click event listener to the "+" button
    addButton.addEventListener("click", function () {
        // Show the modal
        modal.style.display = "block";
    });

    // Add a click event listener to the submit button
    submitButton.addEventListener("click", function () {
        // Get the selected option value
        const selectedOption = document.querySelector('input[name="priority"]:checked');
        if (selectedOption) {
            const selectedValue = selectedOption.value;

            // Get the task input value
            const taskInput = document.getElementById("taskInput").value;

            // Display the task in the appropriate task list
            const taskListId = "tasklist-" + selectedValue;
            const taskList = document.getElementById(taskListId);

            if (taskList) {
                // Create a new list item for the task
                const listItem = document.createElement("li");

                // Create a checkbox and append it to the list item
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.classList.add("round-checkbox");
                listItem.appendChild(checkbox);

                // Create a label for the text and append it to the list item
                const label = document.createElement("label");
                label.textContent = taskInput;
                listItem.appendChild(label);

                // Append the task to the task list
                taskList.appendChild(listItem);

                // Clear the task input
                document.getElementById("taskInput").value = "";

                // Add an event listener to the checkbox for completed tasks
                checkbox.addEventListener("change", function () {
                    if (checkbox.checked) {
                        label.style.textDecoration = "line-through";
                    } else {
                        label.style.textDecoration = "none";
                    }
                });

                // Hide the modal
                modal.style.display = "none";
            } else {
                console.log("Task list not found for selected option: " + selectedValue);
            }
        } else {
            console.log("No option selected.");
        }
    });

    // Close the modal when the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    themeBtn.addEventListener("click", function () {
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
    });
    // Add a click event listener to the delete button
    deleteButton.addEventListener("click", function () {
        // Use window.location.reload() to refresh the page
        window.location.reload();
    });
});




