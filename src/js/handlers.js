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

textarea.value = ""

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



  // Delete button
  const deleteBtn = event.target.closest(".delete-btn");
  if (deleteBtn) {
    const commentId = parseInt(deleteBtn.dataset.commentId);
    const commentType = deleteBtn.dataset.type;

    // Store delete info and show modal
    store.pendingDelete = { commentId, commentType };
    document.getElementById("delete-modal").classList.remove("hidden");
  }

  // Cancel delete
  const cancelDelete = event.target.closest("#cancel-delete");
  if (cancelDelete) {
    store.pendingDelete = null;
    document.getElementById("delete-modal").classList.add("hidden");
  }

  // Confirm delete
  const confirmDelete = event.target.closest("#confirm-delete");
  if (confirmDelete) {
    if (store.pendingDelete) {
      const { commentId, commentType } = store.pendingDelete;

      if (commentType === "comment") {
        store.comments = store.comments.filter((comment) => comment.id !== commentId);
      } else if (commentType === "reply") {
        store.comments = store.comments.map((comment) => {
          return {
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== commentId),
          };
        });
      }

      store.pendingDelete = null;
      document.getElementById("delete-modal").classList.add("hidden");
      renderApp();
    }
  }

// Edit Button
const editBtn = event.target.closest(".edit-btn");
if (editBtn) {
  const commentId = Number(editBtn.dataset.commentId);

  // Check if already editing this comment (UPDATE mode)
  if (store.beingEdited === commentId) {
    const textarea = document.getElementById("edit-textarea");
    const newContent = textarea.value.trim();
    const commentType = editBtn.dataset.type;

    if (!newContent) return;

    if (commentType === "comment") {
      const comment = store.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.content = newContent;
        comment.isEdited = true;
      }
    } else if (commentType === "reply") {
      for (const comment of store.comments) {
        const reply = comment.replies.find((r) => r.id === commentId);
        if (reply) {
          reply.content = newContent;
          reply.isEdited = true;
          break;
        }
      }
    }

    store.beingEdited = null;
  } else {
    // Enter edit mode
    store.beingEdited = commentId;
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
  // Try to find in top-level comments first
  const comment = store.comments.find((c) => c.id === commentId);
  if (comment) {
    comment.score += delta;
    renderApp();
    return;
  }

  // If not found, search in replies
  for (const parentComment of store.comments) {
    const reply = parentComment.replies.find((r) => r.id === commentId);
    if (reply) {
      reply.score += delta;
      renderApp();
      return;
    }
  }
}

export { setupEventListeners };
