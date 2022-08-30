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
          commit('retreiveBooks',books);
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
    retreiveBook(state,book) {
      state.books.push(book);
    },
    retreiveBooks(state,books) {
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
              commit("retreiveChapters", chapters.data);
            }).catch(err=>{
              console.log(err);
            })
      },
      async getChapter({commit}, payload){
        BookDataService.getChapter(payload.bookId, payload.chapterNum)
          .then(chapter => {
            HighlightService.getAllHighlights(payload.bookId,payload.chapterNum)
            .then((highlights)=>{
              commit("setFocusedChapter",{chapter:chapter,highlights:highlights});
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
      retreiveChapters(state,chapters){
          state.chapters= chapters
      },
      clearChapters(state){
          state.chapters={}
      },
      setFocusedChapter(state,payload){
          state.focusedChapter = payload.chapter
          state.focusedChapter["highlights"] = payload.highlights
      },
      addHighlight(state,highlight){
        state.focusedChapter["highlights"].push(highlight)
      }
  }
}
