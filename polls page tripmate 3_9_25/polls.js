document.addEventListener("DOMContentLoaded", function () {
    // Function to navigate back
    window.goBack = function () {
        if (document.referrer) {
            window.history.back();
        } else {
            window.location.href = "homepage.html"; // Redirect to homepage if no history
        }
    };

    // Function to add more options dynamically
    window.addOption = function () {
        let container = document.getElementById("pollOptionsContainer");
        let optionNumber = container.children.length + 1;
        let input = document.createElement("input");
        input.type = "text";
        input.className = "option-input";
        input.placeholder = `Enter option ${optionNumber}`;
        container.appendChild(input);
    };

    // Function to publish the poll
    window.publishPoll = function () {
        let question = document.getElementById("pollQuestion").value.trim();
        let options = document.querySelectorAll(".option-input");

        if (!question) {
            alert("Please enter a question.");
            return;
        }

        let selectedOptions = [];
        options.forEach(option => {
            let value = option.value.trim();
            if (value) {
                selectedOptions.push(value);
            }
        });

        if (selectedOptions.length < 2) {
            alert("Please enter at least two options.");
            return;
        }

        // Convert to Published Poll UI (REMOVED NAME SECTION)
        let pollForm = document.querySelector(".poll-form");
        pollForm.innerHTML = `
            <div class="poll-box">
                <h3>2 Feb 2025</h3>
                <h4>${question}</h4>
                <hr>
                <div class="published-options">
                    ${selectedOptions.map(option => `
                        <label class="poll-option">
                            <input type="radio" name="poll-option"> <span>${option}</span>
                        </label>
                    `).join("")}
                </div>
                <button class="add-more-button">+</button>
            </div>
        `;

        // Ensure radio buttons are selectable
        document.querySelectorAll(".poll-option input").forEach(input => {
            input.disabled = false;
        });
    };
});
