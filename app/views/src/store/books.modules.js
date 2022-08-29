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
            HighlightService.getAllHighlights(payload.bookId,payload.chapterNum)
            .then((highlights)=>{
              commit("setFocusedChapter",chapter,highlights);
            })})
            .catch(err=>{console.log(err)})
      },
      async postHighlight({ commit },payload){
        HighlightService.postNewHighlight(
          payload.bookId,
          payload.chapterNum,
          payload.startloc,
          payload.endloc,
          payload.fromUser,
          payload.content
          ).then((highlight)=>{
            commit("addHighlight",highlight);
          })
          .catch((err)=>{console.log(err)});
      }

  },
  mutations:{
      addChapters(state,chapters){
          state.chapters= chapters
      },
      clearChapters(state){
          state.chapters={}
      },
      setFocusedChapter(state,chapter,highlights=[]){
          state.focusedChapter = chapter
          state.focusedChapter["highlights"] = highlights
      },
      addHighlight(state,highlight){
        state.focusedChapter["highlights"].push(highlight)
      }
  }
}
