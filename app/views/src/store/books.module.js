import BookDataService from "../services/book.service"

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
          commit('setBooks', books);
        })
        .catch(err => {
          console.log(err)
        });
    },
    async addBook({ commit },book){
      return BookDataService.rawCreate(book)
        .then((response) => {
          return Promise.resolve(response.data);
        })
        .catch((err) => {
          return Promise.reject(err.response.data);
        })
    }
  },
  mutations:{
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