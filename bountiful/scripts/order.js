document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the select elements
    const fruit1Select = document.getElementById("fruit1");
    const fruit2Select = document.getElementById("fruit2");
    const fruit3Select = document.getElementById("fruit3");

    // Fetch the fruit data from fruit.json
    fetch("./data/fruit.json")
        .then(response => response.json())
        .then(data => {
            // Populate the select elements with fruit options
            data.fruit.forEach(fruit => {
                const option = document.createElement("option");
                option.text = fruit.name;
                option.value = JSON.stringify(fruit.nutritions);
                fruit1Select.appendChild(option);

                const option2 = document.createElement("option");
                option2.text = fruit.name;
                option2.value = JSON.stringify(fruit.nutritions);
                fruit2Select.appendChild(option2);

                const option3 = document.createElement("option");
                option3.text = fruit.name;
                option3.value = JSON.stringify(fruit.nutritions);
                fruit3Select.appendChild(option3);
            });
        });

    const form = document.getElementById("drinkForm");
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieve form input values
        const firstName = document.getElementById("firstName").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const fruit1 = JSON.parse(fruit1Select.value);
        const fruit2 = JSON.parse(fruit2Select.value);
        const fruit3 = JSON.parse(fruit3Select.value);
        const specialInstructions = document.getElementById("specialInstructions").value;

        // Email validation using regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Phone number validation using regular expression
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Get the current date and time
        const currentDate = new Date();
        const orderDate = currentDate.toLocaleString();

        // Calculate total nutrition values
        const totalCarbohydrates = fruit1.carbohydrates + fruit2.carbohydrates + fruit3.carbohydrates;
        const totalProtein = fruit1.protein + fruit2.protein + fruit3.protein;
        const totalFat = fruit1.fat + fruit2.fat + fruit3.fat;
        const totalSugar = fruit1.sugar + fruit2.sugar + fruit3.sugar;
        const totalCalories = fruit1.calories + fruit2.calories + fruit3.calories;

        // Format output
        const output = `
            <h3>Order Details</h3>
            <p><strong>Order Date:</strong> ${orderDate}</p>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Special Instructions:</strong> ${specialInstructions}</p>
            <h4>Total Nutrition</h4>
            <p><strong>Carbohydrates:</strong> ${totalCarbohydrates.toFixed(2)}g</p>
            <p><strong>Protein:</strong> ${totalProtein.toFixed(2)}g</p>
            <p><strong>Fat:</strong> ${totalFat.toFixed(2)}g</p>
            <p><strong>Sugar:</strong> ${totalSugar.toFixed(2)}g</p>
            <p><strong>Calories:</strong> ${totalCalories}</p>
        `;

        // Hide the form
        form.style.display = "none";

        // Display the order details
        const orderOutput = document.getElementById("orderOutput");
        orderOutput.innerHTML = output;
        orderOutput.style.display = "block";
    });
});
