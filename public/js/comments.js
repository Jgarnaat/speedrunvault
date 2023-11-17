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
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blog_id, comment_description:commentDescription }),
      });

      if (response.ok) {
       // document.location.reload();
      } else {
        // Handle errors here if needed
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};
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
  ]

function randomImage(){
  randomIndex =  Math.floor(Math.random() * image_array.length);

  selected_image = image_array[randomIndex];

  document.getElementById('gif').src=`/assets/gifs/${selected_image}`;}
randomImage(),
document
  .querySelector(".new-comment-form")
  .addEventListener("submit", commentFormHandler);
