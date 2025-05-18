document.addEventListener("DOMContentLoaded", function() {
    const searchEventsBtn = document.getElementById("searchEventsBtn");
    const locationInput = document.getElementById("locationInput");
    const eventList = document.getElementById("eventList");
    const eventForm = document.getElementById("eventForm");
    const eventNameInput = document.getElementById("eventName");
    const eventDateInput = document.getElementById("eventDate");

    const allowedLocations = ["kathmandu", "Bharatpur", "hetauda"];

    searchEventsBtn.addEventListener("click", function () {
        const location = locationInput.value.trim();

        if (allowedLocations.includes(location)) {
            fetchEvents(location);
        } else {
            eventList.innerHTML = `<p>No events available for the location "${location}".</p>`;
        }
    });

    eventForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const eventName = eventNameInput.value.trim();
        const eventDate = eventDateInput.value;

        if (eventName && eventDate) {
            saveEvent(eventName, eventDate);
        }
    });

 
    async function fetchEvents(location) {
        const events = [
            { name: "Music Concert", description: "A live music concert", date: "2025-06-15 3:00PM", location: "kathmandu" },
            { name: "Tech Meetup", description: "A meetup for tech enthusiasts", date: "2025-06-25 11:00AM", location: "Bharatpur" },
            { name: "Food Festival", description: "Taste amazing food made by different communities of Nepal", date: "2025-07-09 2:00PM",
                 location: "Hetauda" }
        ];

        displayEvents(events);
    }

    function displayEvents(events) {
        eventList.innerHTML = '';
        events.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
            `;
            eventList.appendChild(eventDiv);
        });
    }

   
    function saveEvent(name, date) {
        const event = { name, date };
        let savedEvents = JSON.parse(localStorage.getItem("userEvents")) || [];
        savedEvents.push(event);
        localStorage.setItem("userEvents", JSON.stringify(savedEvents));
        alert("Your event has been saved!");
        eventForm.reset();
    }
});
