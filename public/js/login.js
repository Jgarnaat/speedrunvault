// Function to handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Get username and password input elements
  const usernameInput = document.querySelector('#username-login');
  const passwordInput = document.querySelector('#password-login');

  // Trim whitespace from username and password inputs
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // Check if both username and password are provided
  if (username && password) {
    // Prepare the data to be sent in the request
    const requestData = {
      username,
      password
    };

    try {
      // Send a POST request to the user login API
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      // Check if the login was successful
      if (response.ok) {
        // Redirect to the dashboard if login is successful
        document.location.replace('/dashboard');
      } else {
        // Display an alert with the reason for login failure
        alert(`Login failed: ${response.statusText}`);
      }
    } catch (error) {
      // Log an error message if an error occurred during the request
      console.error(`An error occurred: ${error.message}`);
    }
  }
};

// Add an event listener for form submission
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
