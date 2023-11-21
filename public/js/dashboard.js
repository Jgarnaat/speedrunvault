// Function to create a new blog
const createBlog = async (title, description, category, link) => {
  try {
    // Send a POST request to create a new blog
    const response = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, category, link }),
    });

    // Check if the request was successful
    if (response.ok) {
      // Redirect to the dashboard if the blog was created successfully
      document.location.replace('/dashboard');
    } else {
      // Display an alert if there was an issue creating the blog
      alert('Failed to create a blog');
    }
  } catch (error) {
    // Log an error message if an error occurred during the request
    console.error('An error occurred while creating a blog:', error);
  }
};

// Function to delete a blog
const deleteBlog = async (id) => {
  try {
    // Send a DELETE request to delete a blog by ID
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    // Check if the request was successful
    if (response.ok) {
      // Redirect to the dashboard if the blog was deleted successfully
      document.location.replace('/dashboard');
    } else {
      // Display an alert if there was an issue deleting the blog
      alert('Failed to delete the blog');
    }
  } catch (error) {
    // Log an error message if an error occurred during the request
    console.error('An error occurred while deleting the blog:', error);
  }
};

// Function to handle form submission for creating a new blog
const newFormHandler = async (event) => {
  event.preventDefault();

  // Get values from the form
  const title = document.querySelector('#blog-title').value.trim();
  const description = document.querySelector('#blog-desc').value.trim();
  const category = document.querySelector('#blog-cata').value.trim();
  const link = document.querySelector('#blog-link').value.trim();

  // Check if all required fields are filled
  if (title && description && category && link) {
    // Call the createBlog function if all fields are filled
    createBlog(title, description, category, link);
  }
};

// Function to handle delete button click
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    // Get the blog ID from the clicked button's data-id attribute
    const id = event.target.getAttribute('data-id');
    // Call the deleteBlog function with the obtained blog ID
    deleteBlog(id);
  }
};

// Add event listeners to form submission and delete button click
document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
document.querySelector('.blog-list').addEventListener('click', delButtonHandler);
