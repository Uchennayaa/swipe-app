const deck = document.querySelector(".swipe-deck");
const savedEvents = document.getElementById("saved-events");
const searchInput = document.getElementById("search-bar");
const filterType = document.getElementById("filter-type");

let currentEvents = [...events]; // assuming `events` is defined globally

function renderCards() {
  deck.innerHTML = "";
  currentEvents.slice().reverse().forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${event.image}" class="card-image" />
      <div class="card-content">
        <h3>${event.title}</h3>
        <p>${event.location} • ${new Date(event.date).toDateString()}</p>
      </div>
      <div class="card-icons">
        <button class="dislike"><i class="fas fa-xmark"></i></button>
        <button class="like"><i class="fas fa-heart"></i></button>
      </div>
    `;

    // Only image opens event.html
    const image = card.querySelector(".card-image");
    image.addEventListener("click", () => {
      window.location.href = `event.html?id=${index}`;
    });

    // Swipe interaction
    addSwipeListeners(card, event);
    deck.appendChild(card);
  });
}

function addSwipeListeners(card, eventData) {
  let startX = 0,
    currentX = 0,
    dragging = false;

  card.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    dragging = true;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    currentX = e.clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX * 0.05}deg)`;
  });

  card.addEventListener("pointerup", (e) => {
    dragging = false;
    const threshold = 100;

    if (currentX > threshold) {
      saveEvent(eventData);
      card.remove();
    } else if (currentX < -threshold) {
      card.remove();
    } else {
      card.style.transform = "";
    }

    currentX = 0;
    refillDeck();
  });

  // Button clicks
  card.querySelector(".like").addEventListener("click", (e) => {
    e.stopPropagation();
    saveEvent(eventData);
    card.remove();
    refillDeck();
  });

  card.querySelector(".dislike").addEventListener("click", (e) => {
    e.stopPropagation();
    card.remove();
    refillDeck();
  });
}

function saveEvent(event) {
  const saved = JSON.parse(localStorage.getItem("savedEvents")) || [];
  saved.push(event);
  localStorage.setItem("savedEvents", JSON.stringify(saved));

  // Optional: Also update the sidebar display if needed
  const li = document.createElement("li");
  const calendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatForCalendar(event.date)}/${formatForCalendar(event.date)}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
  li.innerHTML = `<a href="${calendarURL}" target="_blank">${event.title}</a>`;
  if (savedEvents) savedEvents.appendChild(li);
}


function formatForCalendar(date) {
  const d = new Date(date);
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function refillDeck() {
  if (deck.children.length === 0) {
    currentEvents = [...events];
    renderCards();
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const type = filterType.value;

  currentEvents = events.filter((event) =>
    event[type].toLowerCase().includes(query)
  );

  renderCards();
});

renderCards();
