// Function to handle signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Get username and password input elements
  const usernameInput = document.querySelector("#username-signup");
  const passwordInput = document.querySelector("#password-signup");

  // Trim whitespace from username and password inputs
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Check if both username and password are provided
  if (username && password) {
    // Prepare the data to be sent in the request
    const userData = {
      username,
      password,
    };

    try {
      // Send a POST request to the user registration API
      const response = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the registration was successful
      if (response.ok) {
        // Redirect to the dashboard if signup is successful
        document.location.replace("/dashboard");
      } else {
        // Display an alert with the reason for signup failure
        const errorMessage = await response.text();
        alert(`Signup failed: Must provide a username, as well as a password with a length of at least 8 characters`);
      }
    } catch (error) {
      // Log an error message if an error occurred during the request
      console.error(`An error occurred: ${error.message}`);
    }
  }
};

// Add an event listener for form submission
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
