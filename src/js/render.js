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

    <!-- Delete Confirmation Modal -->
    <div id="delete-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-sm mx-4 space-y-4">
        <h2 class="text-xl font-medium text-[#334253]">Delete comment</h2>
        <p class="text-[#67727E] text-sm sm:text-base">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
        <div class="flex gap-3">
          <button id="cancel-delete" class="flex-1 bg-[#67727E] hover:bg-[#A9AAB3] text-white font-medium py-3 rounded-lg transition text-sm sm:text-base">NO, CANCEL</button>
          <button id="confirm-delete" class="flex-1 bg-[#ED6368] hover:bg-[#FFB8BB] text-white font-medium py-3 rounded-lg transition text-sm sm:text-base">YES, DELETE</button>
        </div>
      </div>
    </div>
  `;
}

export { renderApp };
