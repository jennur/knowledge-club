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
  state:{
    chapters:{},
    focusedbook:"",
    focusedChapter:{}
  },
  actions:{
      async getAllChapters({ commit }, bookId) {
          BookDataService.getAllChapters(bookId)
            .then(chapters => {
              commit("addChapters", chapters.data);
            }).catch(err=>{
              console.log(err);
            })
      },
      async getChapter({commit}, payload){
        BookDataService.getChapter(payload.bookId, payload.chapterNum)
          .then(chapter => {
            commit("setFocusedChapter",chapter)
          })
          .catch(err=>{console.log(err)})
      }

  },
  mutations:{
      addChapters(state,chapters){
          state.chapters= chapters
      },
      clearChapters(state){
          state.chapters={}
      },
      setFocusedChapter(state,chapter){
          state.focusedChapter = chapter
      }
  }
}
