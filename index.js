document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const searchInput = document.getElementById("search__input");
  const searchButton = document.getElementById("search__btn");

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

  // Search functionality
  if (searchButton && searchInput) {
    searchButton.addEventListener("click", handleSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    });
  }

  function handleSearch() {
    const query = searchInput.value.trim();
    if (query === "") {
      alert("Please enter a search query.");
      return;
    }

    localStorage.setItem("searchQuery", query);
    window.location.href = "events.html";
  }
});
