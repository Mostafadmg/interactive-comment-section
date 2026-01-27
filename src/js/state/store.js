const initialComments = [
  {
    id: 1,
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.",
    author: {
      username: "amyrobson",
      avatar: "src/assets/images/avatars/image-amyrobson.png",
    },
    timestamp: Date.now(),
    score: 20,
    replies: [],
    isEdited: false,
  },
  {
    id: 2,
    content:
      "Woah, your project looks awesome! How long have you been coding for? I’m still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    author: {
      username: "maxblagun",
      avatar: "src/assets/images/avatars/image-maxblagun.png",
    },
    timestamp: Date.now(),
    score: 5,
    replies: [],
    isEdited: false,
  },
  {
    id: 3,
    content: `Woah, your project looks awesome! 🔥
How long have you been coding for? I'm still fairly new myself, but I'm really keen to dive into React soon too. If you have any recommendations on where to learn React (courses, docs, or resources you found useful), I'd love to hear them. Thanks! 🙌`,
    author: {
      username: "Mostafa Damghani",
      avatar: "/src/assets/images/avatars/Mostafa.jpg",
    },
    timestamp: Date.now(),
    score: 7,
    replies: [],
    isEdited: false,
  },
  {
    id: 4,
    content: `Love this project — it's seriously clean 👌
How long have you been coding for? I’m still early in my journey but planning to jump into React soon. Would be great to know where you’d recommend learning it from. Appreciate any tips! 🙏`,
    author: {
      username: "Sara Damghani",
      avatar: "/src/assets/images/avatars/sara.jpg",
    },
    timestamp: Date.now(),
    score: 7,
    replies: [],
    isEdited: false,
  },
];

const currentUser = {
  username: "juliusomo",
  avatar: "/src/assets/images/avatars/Mostafa.jpg",
};

// The store - single source of truth
const store = {
  comments: initialComments,
  currentUser: currentUser,
};

// Export so other files can use it
export { store };
