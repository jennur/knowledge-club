import { createStore } from "vuex";
import { auth } from "./auth.module";
import { books,chapters } from "./books.modules";
import { chat } from "./chat.modules";

const store = createStore({
  modules: {
    auth,
    books,
    chapters,
    chat
  },
});

export default store;