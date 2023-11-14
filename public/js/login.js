const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const usernameInput = document.querySelector('#username-login');
    const passwordInput = document.querySelector('#password-login');
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (username && password) {
      const requestData = {
        username,
        password
      };
  
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(`Login failed: ${response.statusText}`);
        }
      } catch (error) {
        console.error(`An error occurred: ${error.message}`);
      }
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  