// Adds current year after copyright in footer.
let year = new Date().getFullYear()
document.querySelector("#currYear").textContent = year;

// Adds last modified date in footer.
let date = document.lastModified;
document.querySelector("#lastModified").textContent = date;