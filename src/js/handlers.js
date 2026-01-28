import { store } from "./state/store.js";
import { renderApp } from "./render.js";




function handleAddComment(event) {
  const textarea = document.getElementById("textarea");
  const content = textarea.value;

  if (!content.trim()) return;

  const newId = Date.now();

  const newComment = {
    id: newId,
    content: content,
    author: store.currentUser,
    timestamp: Date.now(),
    score: 0,
    replies: [],
    isEdited: false,
  };

  store.comments.push(newComment); // ← INSIDE the if
  textarea.value = ""; // ← INSIDE the if
  renderApp(); // ← INSIDE the if

}

function setupEventListeners() {
  const app = document.getElementById("app");



  app.addEventListener("click", (event) => {

    // Plus button
    const plusBtn = event.target.closest(".plus-btn");
    if (plusBtn) {
      const commentId = parseInt(plusBtn.dataset.commentId);
      handleVote(commentId, 1);
    }




    // Minus button
    const minusBtn = event.target.closest(".minus-btn");
    if (minusBtn) {
      const commentId = parseInt(minusBtn.dataset.commentId);
      handleVote(commentId, -1);
    }




    // Send button - INSIDE the event listener
  const sendBtn = event.target.closest(".send-btn");
  if (sendBtn) {

if (store.replyingTo === null) {

 handleAddComment(event); // Call the handler
 return;


} else {
  const replyTextarea = document.getElementById("reply-textarea")
  const replyValue = replyTextarea.value

  if (replyValue.trim()) {

    const reply = {
      id: Date.now(),
      content: replyValue,
      author: store.currentUser,
      timestamp: Date.now(),
      score:0,
      isEdited:false,
    };

const parentComment = store.comments.find(comment => store.replyingTo === comment.id)
parentComment.replies.push(reply)

store.replyingTo = null

replyTextarea.value = ""

renderApp()
  }
}

  }



  const replyBtn = event.target.closest(".reply-btn");

  if (replyBtn) {

    const commentId = Number(replyBtn.dataset.commentId);

  if (store.replyingTo === commentId) {

    store.replyingTo = null


  } else {
      store.replyingTo = commentId;

  }
    renderApp();
  }
  });





  // Send KeyDown Listener
  app.addEventListener("keydown", (event) => {
    const textarea = event.target.closest("#textarea");

   if (textarea && event.key === "Enter") {
    event.preventDefault()
    handleAddComment(event)
   }
  });
}


function handleVote(commentId, delta) {
  const comment = store.comments.find((c) => c.id === commentId);
  comment.score += delta;
  renderApp();
}

export { setupEventListeners };
