// Function to handle user logout
const logout = async () => {
  try {
    // Send a POST request to the user logout API
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    // Check if the logout was successful
    if (response.ok) {
      // Redirect to the home page after successful logout
      document.location.replace('/');
    } else {
      // Display an alert with the reason for logout failure
      const errorMessage = await response.text();
      alert(`Logout failed: ${response.statusText}\n${errorMessage}`);
    }
  } catch (error) {
    // Log an error message if an error occurred during the request
    console.error(`An error occurred: ${error.message}`);
  }
};

// Add an event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);

  