import { createStore } from "vuex";
import { auth } from "./auth.module";
import { books } from "./books.module";
import { chapters } from "./chapters.module";
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