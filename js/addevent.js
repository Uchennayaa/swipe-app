// addevent.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addEventForm");
  const toast = document.getElementById("successMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Optionally clear the form here
    form.reset();

    // Show toast
    toast.style.display = "block";

    // Hide after 3 seconds
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  });
});
