import { createStore } from "vuex";
import { auth } from "./auth.module";
import { books } from "./books.modules";
import { chat } from "./chat.modules";

const store = createStore({
  modules: {
    auth,
    books,
    chat
  },
});

export default store;