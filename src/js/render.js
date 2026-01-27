import { createCommentCard } from "./componentsCard.js";
import { store } from "./state/store.js";
import { createAddCommentForm } from "./AddCommentForm.js"

function renderApp() {
  const app = document.getElementById("app"); // ✅ Changed "id" to "app"

  const allCommentHTML = store.comments
    .map((comment) => createCommentCard(comment))
    .join("");

    const formHTML = createAddCommentForm()

  // ✅ Removed the random "app;" line

  app.innerHTML = `
    <div class="max-w-2xl mx-auto space-y-4">
      ${allCommentHTML}
      ${formHTML}
    </div>
  `;
}

export { renderApp };
