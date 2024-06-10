document.addEventListener("DOMContentLoaded", function() {
    // Function to update the date field
    function updateDateField() {
        var now = new Date();
        var date = now.toLocaleString();
        document.getElementById("date").innerHTML = date;
        document.getElementById("hidden-date").value = date;
    }

    // Initialize date field on page load
    updateDateField();

    // Handle form submission
    document.getElementById("ticket-form").addEventListener("submit", function(event) {
        event.preventDefault();

        var form = event.target;

        // Gather form data
        var formData = new FormData(form);

        // Send form data to server
        fetch('/post', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Alert user and reset form
                alert("Your form has been submitted successfully.");
                form.reset();
                updateDateField();
            } else {
                alert("There was an issue submitting the form. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error submitting form:", error);
            alert("There was an issue submitting the form. Please try again.");
        });
    });
});
