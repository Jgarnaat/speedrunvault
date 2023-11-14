const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentForm = document.querySelector(".new-comment-form");
  const blog_id = commentForm.dataset.blogid;
  const commentDescriptionInput = document.querySelector(
    "#comment_description"
  );
  const commentDescription = commentDescriptionInput.value.trim();

  if (commentDescription) {
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blog_id, comment_description }),
      });

      if (response.ok) {
        document.location.reload();
      } else {
        // Handle errors here if needed
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
