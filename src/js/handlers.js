import { store } from "./state/store.js";
import { renderApp } from "./render.js";




function handleAddComment(event) {
const sendBtn = event.target.closest(".send-btn");

if (sendBtn) {
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

  }); // ← Event listener ends here

  app.addEventListener("keydown", (event) => {
    const textarea = event.target.closest("#textarea");

    if (textarea) {
      // Check if the pressed key is Enter
      if (event.key === "Enter") {
        event.preventDefault(); // Stop the newline from being added

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

        store.comments.push(newComment);
        textarea.value = "";
        renderApp();
      }
    }
  });
}

function handleVote(commentId, delta) {
  const comment = store.comments.find((c) => c.id === commentId);
  comment.score += delta;
  renderApp();
}

export { setupEventListeners };
