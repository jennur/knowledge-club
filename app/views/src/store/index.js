import { createStore } from "vuex";
import { auth } from "./auth.module";
import { books } from "./books.modules";

const store = createStore({
  modules: {
    auth,
    books
  },
});

export default store;