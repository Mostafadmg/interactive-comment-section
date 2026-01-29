import { store } from "./state/store.js";
import { createReplyForm } from "./AddCommentForm.js";

function createCommentCard(comment) {
  return `
    <div class="comment-container bg-white rounded-lg p-4 sm:p-6">
      <div class="comment-content flex flex-col md:flex-row gap-3 sm:gap-4">

        <!-- Vote buttons (desktop only - on left) -->
        <div class="vote-container bg-[#F5F6FA] rounded-lg hidden md:flex md:flex-col items-center gap-2 px-3 py-2 md:px-2 md:py-3 md:self-start">
          <button class="plus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${comment.id}">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
              <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
            </svg>
          </button>

          <span class="vote-counter text-[#5357B6] font-medium text-sm sm:text-base min-w-[20px] text-center">${comment.score}</span>

          <button class="minus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${comment.id}">
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
              <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
            </svg>
          </button>
        </div>

        <!-- Content wrapper -->
        <div class="content-wrapper flex-1 flex flex-col gap-3 sm:gap-4">
          <!-- Header -->
          <div class="comment-header flex items-center gap-3 sm:gap-4 flex-wrap">
            <img
              src="${comment.author.avatar}"
              alt="${comment.author.username}"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span class="font-medium text-[#334253] text-sm sm:text-base">
              ${comment.author.username}
            </span>
            ${comment.author.username === store.currentUser.username ? '<span class="bg-[#5357B6] text-white text-[0.8125rem] font-medium leading-[120%] not-italic px-2 py-0.5 rounded">you</span>' : ''}
            <span class="text-[#67727E] text-xs sm:text-sm">
              ${formatTimestamp(comment.timestamp)}
            </span>

            ${comment.author.username === store.currentUser.username ? `
            <!-- Delete & Edit buttons -->
            <div class="hidden md:flex items-center gap-3 sm:gap-4 ml-auto">
              <button class="delete-btn group flex items-center gap-1.5 sm:gap-2 text-[#ED6368] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${comment.id}" data-type="comment">
                <img src="src/assets/images/icon-delete.svg" alt="delete" class="w-3 h-3">
                <span>Delete</span>
              </button>
              <button class="edit-btn group flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${comment.id}" data-type="comment">
                <img src="src/assets/images/icon-edit.svg" alt="edit" class="w-3 h-3">
                <span>${comment.id === store.beingEdited ? 'Update' : 'Edit'}</span>
              </button>
            </div>
            ` : `
            <!-- Reply button -->
            <button class="reply-btn group hidden md:flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:text-[#C5C6EF] font-medium transition text-sm sm:text-base ml-auto" data-comment-id="${comment.id}">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" class="shrink-0 overflow-visible">
                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor" class="transition-[fill] duration-200"/>
              </svg>
              <span>${comment.id === store.replyingTo ? "Close Reply" : "Reply"}</span>
            </button>
            `}
          </div>

          <!-- Comment text -->
        ${
          comment.id === store.beingEdited
            ? `
    <textarea id="edit-textarea" class="w-full h-32 resize-none text-[#67727E] leading-relaxed p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5357B6] text-sm sm:text-base">${comment.content}</textarea>
  `
            : `
    <p class="text-[#67727E] leading-relaxed whitespace-pre-line text-sm sm:text-base">${comment.content}</p>
  `
        }

          <!-- Actions (mobile only) -->
          <div class="comment-actions flex md:hidden justify-between items-center">
            <!-- Vote buttons (mobile) -->
            <div class="vote-container bg-[#F5F6FA] rounded-lg flex items-center gap-2 px-3 py-2">
              <button class="plus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${comment.id}">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
                  <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                </svg>
              </button>

              <span class="vote-counter text-[#5357B6] font-medium text-sm sm:text-base min-w-[20px] text-center">${comment.score}</span>

              <button class="minus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${comment.id}">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
                  <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                </svg>
              </button>
            </div>

            ${comment.author.username === store.currentUser.username ? `
            <!-- Delete & Edit buttons (mobile) -->
            <div class="flex items-center gap-3 sm:gap-4">
              <button class="delete-btn group flex items-center gap-1.5 sm:gap-2 text-[#ED6368] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${comment.id}" data-type="comment">
                <img src="src/assets/images/icon-delete.svg" alt="delete" class="w-3 h-3">
                <span>Delete</span>
              </button>
              <button class="edit-btn group flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${comment.id}" data-type="comment">
                <img src="src/assets/images/icon-edit.svg" alt="edit" class="w-3 h-3">
                <span>${comment.id === store.beingEdited ? 'Update' : 'Edit'}</span>
              </button>
            </div>
            ` : `
            <!-- Reply button (mobile) -->
            <button class="reply-btn group flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:text-[#C5C6EF] font-medium transition text-sm sm:text-base" data-comment-id="${comment.id}">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" class="shrink-0 overflow-visible">
                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor" class="transition-[fill] duration-200"/>
              </svg>
              <span>${comment.id === store.replyingTo ? "Close Reply" : "Reply"}</span>
            </button>
            `}
          </div>
        </div>
      </div>
    </div>

    ${comment.id === store.replyingTo ? createReplyForm(comment.author.username) : ""}


 ${comment.replies.length > 0 ? comment.replies.map((reply) => createReplyCard(reply)).join("") : ""}


  `;
}

function formatTimestamp(timestamp) {
  const now = Date.now();
  const difference = now - timestamp;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const diffInDays = Math.floor(difference / millisecondsInDay);

  if (diffInDays === 0) return "Today";

  if (diffInDays === 1) return "1 day ago";

  if (diffInDays < 30) return `${diffInDays} days ago`;

  if (diffInDays < 60) return "1 month ago";

  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} months ago`;
  }

  if (diffInDays < 730) return "1 year ago";

  const years = Math.floor(diffInDays / 365);
  return `${years} years ago`;
}






function createReplyCard(reply) {
  return `
  <div class="ml-4 md:ml-10 pl-4 md:pl-6 border-l-2 border-gray-200">
    <div class="comment-container bg-white rounded-lg p-4 sm:p-6">
      <div class="comment-content flex flex-col md:flex-row gap-3 sm:gap-4">

        <!-- Vote buttons (desktop only - on left) -->
        <div class="vote-container bg-[#F5F6FA] rounded-lg hidden md:flex md:flex-col items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 md:px-2 md:py-3 md:self-start">
          <button class="plus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${reply.id}">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
              <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
            </svg>
          </button>

          <span class="vote-counter text-[#5357B6] font-medium text-sm sm:text-base min-w-[20px] text-center">${reply.score}</span>

          <button class="minus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${reply.id}">
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
              <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
            </svg>
          </button>
        </div>

        <!-- Content wrapper -->
        <div class="content-wrapper flex-1 flex flex-col gap-3 sm:gap-4">
          <!-- Header -->
          <div class="comment-header flex items-center gap-3 sm:gap-4 flex-wrap">
            <img
              src="${reply.author.avatar}"
              alt="${reply.author.username}"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span class="font-medium text-[#334253] text-sm sm:text-base">
              ${reply.author.username}
            </span>
            ${reply.author.username === store.currentUser.username ? '<span class="bg-[#5357B6] text-white text-[0.8125rem] font-medium leading-[120%] not-italic px-2 py-0.5 rounded">you</span>' : ''}
            <span class="text-[#67727E] text-xs sm:text-sm">
              ${formatTimestamp(reply.timestamp)}
            </span>

            ${reply.author.username === store.currentUser.username ? `
            <!-- Delete & Edit buttons -->
            <div class="hidden md:flex items-center gap-3 sm:gap-4 ml-auto">
              <button class="delete-btn group flex items-center gap-1.5 sm:gap-2 text-[#ED6368] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${reply.id}" data-type="reply">
                <img src="src/assets/images/icon-delete.svg" alt="delete" class="w-3 h-3">
                <span>Delete</span>
              </button>
              <button class="edit-btn group flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${reply.id}" data-type="reply">
                <img src="src/assets/images/icon-edit.svg" alt="edit" class="w-3 h-3">
                <span>${reply.id === store.beingEdited ? 'Update' : 'Edit'}</span>
              </button>
            </div>
            ` : `
            <!-- Reply button -->
            <button class="reply-btn group hidden md:flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:text-[#C5C6EF] font-medium transition text-sm sm:text-base ml-auto" data-comment-id="${reply.id}">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" class="shrink-0 overflow-visible">
                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor" class="transition-[fill] duration-200"/>
              </svg>
              <span>${reply.id === store.replyingTo ? "Close Reply" : "Reply"}</span>
            </button>
            `}
          </div>

          <!-- Comment text -->
        ${
          reply.id === store.beingEdited
            ? `
    <textarea id="edit-textarea" class="w-full h-32 resize-none text-[#67727E] leading-relaxed p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#5357B6] text-sm sm:text-base">${reply.content}</textarea>
  `
            : `
    <p class="text-[#67727E] leading-relaxed whitespace-pre-line text-sm sm:text-base">${reply.content}</p>
  `
        }

          <!-- Actions (mobile only) -->
          <div class="comment-actions flex md:hidden justify-between items-center">
            <!-- Vote buttons (mobile) -->
            <div class="vote-container bg-[#F5F6FA] rounded-lg flex items-center gap-2 px-3 py-2">
              <button class="plus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${reply.id}">
                <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
                  <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/>
                </svg>
              </button>

              <span class="vote-counter text-[#5357B6] font-medium text-sm sm:text-base min-w-[20px] text-center">${reply.score}</span>

              <button class="minus-btn hover:opacity-60 transition p-2 cursor-pointer" data-comment-id="${reply.id}">
                <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg" class="pointer-events-none">
                  <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/>
                </svg>
              </button>
            </div>

            ${reply.author.username === store.currentUser.username ? `
            <!-- Delete & Edit buttons (mobile) -->
            <div class="flex items-center gap-3 sm:gap-4">
              <button class="delete-btn group flex items-center gap-1.5 sm:gap-2 text-[#ED6368] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${reply.id}" data-type="reply">
                <img src="src/assets/images/icon-delete.svg" alt="delete" class="w-3 h-3">
                <span>Delete</span>
              </button>
              <button class="edit-btn group flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:opacity-60 font-medium transition text-sm sm:text-base" data-comment-id="${reply.id}" data-type="reply">
                <img src="src/assets/images/icon-edit.svg" alt="edit" class="w-3 h-3">
                <span>${reply.id === store.beingEdited ? 'Update' : 'Edit'}</span>
              </button>
            </div>
            ` : `
            <!-- Reply button (mobile) -->
            <button class="reply-btn group flex items-center gap-1.5 sm:gap-2 text-[#5357B6] hover:text-[#C5C6EF] font-medium transition text-sm sm:text-base" data-comment-id="${reply.id}">
              <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13" class="shrink-0 overflow-visible">
                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="currentColor" class="transition-[fill] duration-200"/>
              </svg>
              <span>${reply.id === store.replyingTo ? "Close Reply" : "Reply"}</span>
            </button>
            `}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}





export { createCommentCard };
