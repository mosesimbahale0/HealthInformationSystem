document.addEventListener("DOMContentLoaded", function () {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Display the current year in the "currentYear" span
  document.getElementById("currentYear").textContent = currentYear;
});
