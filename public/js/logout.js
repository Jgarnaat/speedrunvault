const logout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        const errorMessage = await response.text();
        alert(`Logout failed: ${response.statusText}\n${errorMessage}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  