import BookDataService from "../services/book.service"

export const books = {
  namespaced:true,
  state: {
    books: []
  },
  actions: {
    async getAllBooks({ commit }) {
      return BookDataService.getAll()
        .then(books => {
          commit("clearBooks");
          commit('setBooks', books);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
    async getBooks({ commit }, params) {
      return BookDataService.getBooks(params)
        .then(books => {
          commit("clearBooks");
          commit('setBooks', books);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
    async addBook({ commit }, book) {
      return BookDataService.rawCreate(book)
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    },
    async deleteBook({ commit }, bookId) {
      return BookDataService.delete(bookId)
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
    }
  },
  mutations: {
    setBook(state,book) {
      state.books.push(book);
    },
    setBooks(state,books) {
      state.books = state.books.concat(books);
    },
    clearBooks(state) {
      state.books = []
    }
  }
}