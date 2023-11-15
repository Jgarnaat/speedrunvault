const createBlog = async (title, description, category, link) => {
    try {
      
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, category, link }),
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create a blog');
      }
    } catch (error) {
      console.error('An error occurred while creating a blog:', error);
    }
  };
  
  const deleteBlog = async (id) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete the blog');
      }
    } catch (error) {
      console.error('An error occurred while deleting the blog:', error);
    }
  };
  
  const newFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    const category = document.querySelector('#blog-cata').value.trim();
    const link = document.querySelector('#blog-link').value.trim();
    if (title && description && category && link) {
      createBlog(title, description, category, link);
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      deleteBlog(id);
    }
  };
  
  document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);
  document.querySelector('.blog-list').addEventListener('click', delButtonHandler);
  