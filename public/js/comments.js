// Function to handle comment form submission
const commentFormHandler = async (event) => {
  event.preventDefault();

  // Get the comment form and blog ID
  const commentForm = document.querySelector(".new-comment-form");
  const blog_id = commentForm.dataset.blogid;

  // Get the input and trim the comment description
  const commentDescriptionInput = document.querySelector("#comment_description");
  const commentDescription = commentDescriptionInput.value.trim();

  // Check if the comment description is not empty
  if (commentDescription) {
    try {
      // Send a POST request to the comment API
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blog_id, comment_description: commentDescription }),
      });

      // Check if the request was successful
      if (response.ok) {
        // Reload the document if the comment was submitted successfully
        // document.location.reload();
      } else {
        // Handle errors here if needed
        console.error("Failed to submit comment");
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error("An error occurred:", error);
    }
  }
};

// Array of image filenames
image_array = [
  'gif_1.gif',
  'gif_2.gif',
  'gif_3.gif',
  'gif_4.gif',
  'gif_5.gif',
  'gif_6.gif',
  'gif_7.gif',
  'gif_8.gif',
  'gif_9.gif',
  'gif_10.gif',
  'gif_11.gif',
  'gif_12.gif',
  'gif_13.gif',
  'gif_14.gif',
  'gif_15.gif',
  'gif_16.gif',
];

// Function to display a random image
function randomImage() {
  randomIndex = Math.floor(Math.random() * image_array.length);

  // Select a random image from the array
  selected_image = image_array[randomIndex];

  // Set the source of the 'gif' element to display the selected image
  document.getElementById('gif').src = `/assets/gifs/${selected_image}`;
}

// Call the randomImage function to display a random image
randomImage();

// Add a submit event listener to the comment form
document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
