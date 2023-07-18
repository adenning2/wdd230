// Function to get the drink count from local storage
function getDrinkCount() {
  const count = localStorage.getItem("drinkCount");
  return count ? parseInt(count) : 0;
}

// Function to update the drink count information
function updateDrinkCount() {
  const count = getDrinkCount();
  document.getElementById("drinkCountInfo").textContent = `You have submitted ${count} specialty drinks.`;
}

// Update the drink count information
updateDrinkCount();