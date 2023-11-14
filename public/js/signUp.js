const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector("#username-signup");
  const passwordInput = document.querySelector("#password-signup");

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        const errorMessage = await response.text();
        alert(`Signup failed: ${response.statusText}\n${errorMessage}`);
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
