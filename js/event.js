// event.js

const urlParams = new URLSearchParams(window.location.search);
const eventId = parseInt(urlParams.get('id'));
const eventCard = document.getElementById("event-card");
const otherEventsContainer = document.getElementById("other-events");

if (!isNaN(eventId) && events[eventId]) {
  const event = events[eventId];
  eventCard.innerHTML = `
    <div class="card" style="position: relative; width: 100%; max-width: 600px;">
      <img src="${event.image}" alt="${event.title}" />
      <div class="card-content">
        <h2>${event.title}</h2>
        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
        <p><i class="fas fa-calendar-alt"></i> ${new Date(event.date).toDateString()}</p>
        <p>${event.description}</p>
        <a href="https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatForCalendar(event.date)}/${formatForCalendar(event.date)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}" target="_blank" class="rsvp-btn">
          <i class="fas fa-calendar-plus"></i> RSVP via Google Calendar
        </a>
      </div>
    </div>
  `;

  const otherEvents = events.filter((e, i) => i !== eventId).slice(0, 3);
  otherEvents.forEach((e, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.cursor = 'pointer';
    card.innerHTML = `
      <img src="${e.image}" alt="${e.title}" />
      <div class="card-content">
        <h4>${e.title}</h4>
        <p>${e.location}</p>
        <p>${new Date(e.date).toDateString()}</p>
      </div>
    `;
    card.onclick = () => {
      window.location.href = `event.html?id=${events.indexOf(e)}`;
    };
    otherEventsContainer.appendChild(card);
  });
} else {
  eventCard.innerHTML = `<p>Event not found</p>`;
}

function formatForCalendar(date) {
  const d = new Date(date);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
} 
