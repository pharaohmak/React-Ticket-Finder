document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const searchQuery = localStorage.getItem("searchQuery");
  const eventsListEl = document.getElementById("events-panel");
  const attractionsEl = document.getElementById("attraction-panel");
  const loadingEl = document.getElementById("loading__state");
  const searchResultsTextEl = document.querySelector(".search__info");

  // Clear the search input on page load
  searchInput.value = "";

  eventsListEl.style.display = "none";
  attractionsEl.style.display = "none";
  loadingEl.style.display = "none";

  // Get the hamburger icon and overlay elements
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("close-btn");

  // Add event listeners to the hamburger icon and close button
  hamburger.addEventListener("click", () => {
    overlay.classList.toggle("active");
  });

  closeBtn.addEventListener("click", () => {
    overlay.classList.toggle("active");
  });

  const isEventsPage = window.location.pathname.includes("events.html");

  if (isEventsPage && searchQuery) {
    searchInput.value = searchQuery;
    performSearch(searchQuery);
  }

  searchButton.addEventListener("click", () =>
    handleSearch(searchInput.value.trim())
  );
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch(searchInput.value.trim());
    }
  });

  async function handleSearch(query) {
    if (query === "") {
      eventsListEl.innerHTML = "<p>Please enter a search query.</p>";
      return;
    }

    if (isEventsPage) {
      localStorage.setItem("searchQuery", query);
    }

    performSearch(query);
  }

  async function performSearch(query) {
    try {
      loadingEl.style.display = "block";

      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(
          query
        )}&countryCode=US&apikey=qZWhqtApmbArpBw5qrGmoA6xfOZtpYaZ`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const eventsData = await response.json();
      loadingEl.style.display = "none";
      eventsListEl.style.display = "block";
      searchResultsTextEl.innerHTML = `Search results for "${query}"`;

      if (!eventsData._embedded || !eventsData._embedded.events) {
        eventsListEl.innerHTML = "<p>No events found.</p>";
        return;
      }

      eventsListEl.innerHTML = eventsData._embedded.events
        .map((event) => eventsHTML(event))
        .join("");
    } catch (error) {
      loadingEl.style.display = "none";
      console.error("Failed to fetch events:", error);
      eventsListEl.innerHTML = "<p>Failed to fetch events.</p>";
    }
  }
});

function showEventInfo(event, eventId) {
  event.preventDefault(); // Prevent default link behavior
  localStorage.setItem("eventId", eventId); // Store the event ID in localStorage

  const eventsPanel = document.getElementById("events-panel");
  const attractionsPanel = document.getElementById("attraction-panel");
  eventsPanel.style.display = "none";
  attractionsPanel.style.display = "block";

  // Fetch event details and display in the attraction panel
  fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=qZWhqtApmbArpBw5qrGmoA6xfOZtpYaZ`)
    .then(response => response.json())
    .then(eventData => {
      attractionsPanel.innerHTML = attractionsHTML(eventData);
    })
    .catch(error => {
      console.error("Failed to fetch event details:", error);
      attractionsPanel.innerHTML = "<p>Failed to fetch event details.</p>";
    });
}

function eventsHTML(event) {
  return `
    <div class="event-item">
      <a href="#" class="list-group-item" onclick="showEventInfo(event, '${event.id}')">
        <h4 class="list-group-item-heading">${event.name}</h4>
        <p class="list-group-item-text">${event.dates.start.localDate}</p>
        <p class="venue">${event._embedded.venues[0].name}</p>
      </a>
    </div>
  `;
}

function attractionsHTML(event) {
  const attraction = event._embedded.attractions
    ? event._embedded.attractions[0]
    : { name: "N/A", classifications: [{ genre: { name: "N/A" } }] };

  return `
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Attraction</h3>
      </div>
      <div class="panel-body">
        <h4 class="list-group-item-heading">${attraction.name}</h4>
        <img class="col-xs-12" src="${
          attraction.images ? attraction.images[0].url : ""
        }" />
        <p id="classification">${
          attraction.classifications
            ? attraction.classifications[0].genre.name
            : "N/A"
        }</p>
        <a href=${event.url} target="_blank">${event.url}</a>

      </div>
    </div>
  `;
}