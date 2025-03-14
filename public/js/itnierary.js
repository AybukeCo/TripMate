function generateItinerary() {
    // Get values from input fields
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const flightDetails = document.getElementById("flight-details").value;
    const accommodation = document.getElementById("accommodation").value;
    
    // Check if dates are selected
    if (!startDate || !endDate) {
        alert("Please select a start and end date.");
        return;
    }

    if (startDate>endDate) {
        alert("The end date must be later than the start date.");
        return;
    }

    // Store input values (for editing)
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("flightDetails", flightDetails);
    localStorage.setItem("accommodation", accommodation);

    // Convert dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate number of days
    const days = [];
    let currentDate = new Date(start);
    while (currentDate <= end) {
        days.push(new Date(currentDate)); // Add day to the list
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    // Generate the top section with Flight Details and Accommodation
    let itineraryHTML = `
        <h2>Your Itinerary</h2>
        <div class="itinerary-top">
            <p><strong>Flight Details:</strong> ${flightDetails || "No flight details provided."}</p>
            <p><strong>Accommodation:</strong> ${accommodation || "No accommodation details provided."}</p>
        </div>
        <button id="edit-itinerary" class="edit-itinerary" onclick="editItinerary()">Edit Itinerary</button>
    `;

    // Generate daily itinerary with "Add Activity" buttons
    days.forEach((date, index) => {
        const formattedDate = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }); // Example: 8 May
        itineraryHTML += `
            <div class="itinerary-day">
                <h3>Day ${index + 1}: ${formattedDate}</h3>
                <ul id="activities-day-${index}"></ul> 
                <input type="text" id="activity-input-${index}" placeholder="Add activity for this day">
                <button class="activity-add" onclick="addActivity(${index})">Add Activity</button>
            </div>
        `;
    });

    // Add "Edit Itinerary" button in the output tab
    const itineraryOutput = document.getElementById("itinerary-output");
    const editItineraryButton = document.getElementById("edit-itinerary");


    // Hide the form and show the itinerary
    document.getElementById("itinerary-form").style.display = "none";
    itineraryOutput.style.display = "block";
    itineraryOutput.innerHTML = itineraryHTML;
}

// Function to edit the itinerary
function editItinerary() {
    // Retrieve stored values
    document.getElementById("start-date").value = localStorage.getItem("startDate");
    document.getElementById("end-date").value = localStorage.getItem("endDate");
    document.getElementById("flight-details").value = localStorage.getItem("flightDetails");
    document.getElementById("accommodation").value = localStorage.getItem("accommodation");

    // Show the form again and hide the itinerary
    document.getElementById("itinerary-form").style.display = "block";
    document.getElementById("itinerary-output").style.display = "none";
    document.getElementById("edit-itinerary").style.display = "none";
}

// Function to add activity for a specific day (with delete button)
function addActivity(dayIndex) {
    const inputField = document.getElementById(`activity-input-${dayIndex}`);
    const activityText = inputField.value.trim();

    if (activityText !== "") {
        const activityList = document.getElementById(`activities-day-${dayIndex}`);

        // Create list item
        const listItem = document.createElement("li");
        listItem.classList.add("activity-item");

        const listText=document.createElement("span")
        listText.textContent = activityText;

        listItem.appendChild(listText);

        // Create delete button (x))
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete-btn"); // Add class for styling
        deleteBtn.onclick = function() {
            listItem.remove(); // Remove activity when clicked
        };

        // Append delete button to list item
        listItem.appendChild(deleteBtn);
        activityList.appendChild(listItem);

        // Clear the input after adding
        inputField.value = "";
    }
}
