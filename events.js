const eventsListEl = document.querySelector(".event__list--group");
const loadingEl = document.getElementById("loading__state");

async function main() {
  try {
    // Show loading indicator
    loadingEl.style.display = 'block';

    const response = await fetch(
  "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=qZWhqtApmbArpBw5qrGmoA6xfOZtpYaZ", { cache: "no-cache" }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const eventsData = await response.json();
    console.log(eventsData)
    
    // Hide loading indicator
    loadingEl.style.display = 'none';
    
    eventsListEl.innerHTML = eventsData._embedded.events
      .map((event) => eventsHTML(event))
      .join("");
    console.log(eventsListEl);
  } catch (error) {
    // Hide loading indicator in case of error
    loadingEl.style.display = 'none';

    console.error("Failed to fetch events:", error);
  }
}

main();

function showEventInfo(id) {
  localStorage.setItem("id", id);
  window.location.href = `${window.location.origin}/events.html`;
}

function eventsHTML(event) {
  return `
    <a href="#" class="list-group-item" onclick="showEventInfo('${event.id}')">
      <h4 class="list-group-item-heading">${event.name}</h4>
      <p class="list-group-item-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua.
      </p>
      <p class="venue">${event._embedded.venues.name}</p>
    </a>
  `;
}
