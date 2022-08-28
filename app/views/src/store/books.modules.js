import BookDataService from "../services/BookDataService"

export const books = {
  namespaced:true,
  state:{
    books:[]
  },
  actions:{
    async getAllBooks({ commit }){
      BookDataService.getAll()
        .then(books => {
          commit("clearBooks");
          commit('addBooks',books);
        })
        .catch(err => {
          console.log(err)
        });
    }
  },
  mutations:{
    addBook(state,book) {
      state.books.push(book);
    },
    addBooks(state,books) {
      state.books = state.books.concat(books);
    },
    clearBooks(state) {
      state.books = []
    }
  }
}

export const chapters = {
  namespaced:true,
  state: {
    chapters: {},
    focusedbook:""
  },
  actions: {
    async getAllChapters({ commit }, bookId) {
      BookDataService.getAllChapters(bookId)
        .then(response => {
          commit("addChapters", response.data.chapters);
        })
        .catch(err => {
          console.log("Error getting chapters:", err);
        })
    }
  },
  mutations: {
    addChapters(state, chapters) {
      state.chapters = chapters
    },
    clearChapters(state){
      state.chapters = {}
    }
  }
}
