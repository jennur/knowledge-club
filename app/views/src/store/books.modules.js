import BookDataService from "../services/book.service"
import HighlightService from "../services/highlight.service";

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
      BookDataService.rawCreate(book)
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

export const chapters = {
  namespaced:true,
  state: {
    chapters: {},
    focusedbook: {},
    focusedChapter: {}
  },
  actions:{
      getAllChapters({ commit }, bookId) {
        BookDataService.getAllChapters(bookId)
          .then(chapters => {
            commit("setChapters", chapters.data);
            return chapters;
          })
          .catch(err=>{
            console.log(err);
            return err;
          })
      },

      getFocusedBook({ commit }, bookId) {
        BookDataService.getBookById(bookId)
          .then(book => {
            console.log("Book", book);
            commit("setFocusedBook", book.data);
            return book;
          })
          .catch(err=>{
            console.log(err);
            return err;
          })
      },

      getChapter({ commit }, payload){
        BookDataService.getChapter(payload.bookId, payload.chapterNum)
          .then(chapter => {
            HighlightService.getAllHighlights(payload.bookId, payload.chapterNum)
            .then((highlights)=>{
              commit("setFocusedChapter", {
                chapter,
                highlights
              });
            })})
            .catch(err=>{console.log(err)})
      },
      postHighlight({ commit },payload){
        HighlightService.postNewHighlight(
          payload.bookId,
          payload.chapterNum,
          payload.startloc,
          payload.endloc,
          payload.fromUser,
          payload.content
          ).then((highlight)=>{
            commit("setHighlight",highlight);
          })
          .catch((err)=>{console.log(err)});
      }

  },
  mutations:{
      setChapters(state,chapters){
          state.chapters= chapters;
      },
      clearChapters(state){
          state.chapters={};
      },
      setFocusedBook(state, payload) {
        state.focusedBook = payload;
      },
      setFocusedChapter(state,payload){
          state.focusedChapter = payload.chapter;
          state.focusedChapter["highlights"] = payload.highlights;
      },
      setHighlight(state,highlight){
        state.focusedChapter["highlights"].push(highlight);
      }
  }
}
