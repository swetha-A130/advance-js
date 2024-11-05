document.addEventListener("DOMContentLoaded", () => {
    let employees = [];
    let employeeId = 1;

    const addEmployeeButton = document.getElementById("addEmployeeBtn");
    const nameInput = document.getElementById("name");
    const professionInput = document.getElementById("profession");
    const ageInput = document.getElementById("age");
    const messageDiv = document.getElementById("message");
    const employeeListDiv = document.getElementById("employeeList");
    const header = document.querySelector("h1"); // The <h1> tag we want to modify

    // Function to display success or error messages
    function showMessage(message, isSuccess) {
        messageDiv.textContent = message;
        messageDiv.className = isSuccess ? "success" : "error";
        
        // Change the <h1> text based on success or error
        if (isSuccess) {
            header.textContent = "New Employees Success";
        } else {
            header.textContent = "New Employees Error";
        }
    }

    // Function to render the list of employees
    function renderEmployeeList() {
        employeeListDiv.innerHTML = "";  // Clear current list

        if (employees.length === 0) {
            employeeListDiv.innerHTML = "<p>You have 0 Employees.</p>";
            return;
        }

        employees.forEach(employee => {
            const employeeDiv = document.createElement("div");
            employeeDiv.classList.add("employee");
            employeeDiv.innerHTML = `
                <strong>${employee.name}</strong> - ${employee.profession} - ${employee.age} years old
                <button class="deleteBtn" data-id="${employee.id}">Delete user</button>
            `;
            employeeListDiv.appendChild(employeeDiv);
        });

        // Add delete button functionality
        const deleteButtons = document.querySelectorAll(".deleteBtn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const employeeIdToDelete = parseInt(event.target.dataset.id);
                employees = employees.filter(employee => employee.id !== employeeIdToDelete);
                renderEmployeeList();
            });
        });
    }

    // Function to handle the adding of employee
    addEmployeeButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const profession = professionInput.value.trim();
        const age = parseInt(ageInput.value.trim(), 10);

        if (name === "" || profession === "" || isNaN(age)) {
            showMessage("Error:Please Make sure All the fileds are filled before adding in an employee!", false);
        } else {
            // Add employee to the list
            const newEmployee = {
                id: employeeId++,  // Auto-increment ID
                name,
                profession,
                age
            };
            employees.push(newEmployee);

            showMessage("Success:Employee Added!", true);
            renderEmployeeList();

            // Clear the form inputs
            nameInput.value = "";
            professionInput.value = "";
            ageInput.value = "";
        }
    });

    // Initial call to render any employees (if added from previous sessions)
    renderEmployeeList();
});
