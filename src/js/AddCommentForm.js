import { store } from "./state/store.js";
import { html } from 'lit-html';

function createAddCommentForm() {
  return html`
<div class="addComment-container bg-white rounded-lg">
<div class="addComment-content p-4 sm:p-6">
<div class="comment-Input">
  <textarea name="textarea" id="textarea" placeholder="Add a comment..." class="w-full h-32 sm:h-40 resize-none text-[#67727E] leading-relaxed p-3 sm:p-4 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:border-[#5357B6]"></textarea>
</div>
<div class="addComment-actions flex flex-row justify-between items-center mt-3 sm:mt-4">
<img src="${store.currentUser.avatar}" alt="user" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
<button class="send-btn font-medium bg-[#5357B6] hover:bg-[#C5C6EF] text-white py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base rounded-lg transition" data-send-btn>Send</button>
</div>

</div>
</div>
    `;

}

export { createAddCommentForm, createReplyForm };


function createReplyForm(username) {
  return html`
  <div class ="ml-4 md:ml-10 pl-4 md:pl-6 border-l-2 border-gray-200">
    <div class="addComment-container bg-white rounded-lg">
      <div class="addComment-content p-6">

        <!-- Reply Input -->
        <div class="comment-Input">
          <textarea
            name="textarea"
            id="reply-textarea"
            placeholder="Replying to @${username}..."
            class="w-full h-24 sm:h-28 resize-none text-[#67727E] leading-relaxed p-3 sm:p-4 text-sm sm:text-base border border-gray-200 rounded-lg focus:outline-none focus:border-[#5357B6]"
          ></textarea>
        </div>

        <!-- Reply Actions -->
        <div class="addComment-actions flex flex-row justify-between items-center mt-3 sm:mt-4">
          <img
            src="${store.currentUser.avatar}"
            alt="user"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          >
          <button
            class="send-btn font-medium bg-[#5357B6] hover:bg-[#C5C6EF] text-white py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base rounded-lg transition"
            data-send-btn
          >Reply</button>
        </div>

      </div>
    </div>
    </div>
  `;
}


