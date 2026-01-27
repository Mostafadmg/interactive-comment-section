import { store } from "./state/store.js";

function createAddCommentForm() {
  return `
<div class="addComment-container bg-white rounded-lg">
<div class="addComment-content p-6">
<div class="comment-Input">
  <textarea name="textarea" id="textarea" placeholder="Add a comment..." class="w-full h-40 resize-none text-[#67727E] leading-relaxed p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5357B6]"></textarea>
</div>
<div class="addComment-actions flex flex-row justify-between">
<img src="${store.currentUser.avatar}" alt="user" class="w-8 h-8 rounded-full">
<button class="send-btn font-medium bg-[#5357B6] hover:bg-[#C5C6EF] text-white py-3 px-6 rounded-lg transition" data-send-btn>Send</button>
</div>

</div>
</div>
    `;
}

export { createAddCommentForm };
