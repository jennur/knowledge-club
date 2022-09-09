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

export const chapters = {
  namespaced:true,
  state: {
    chapters: {},
    focusedbook: {},
    focusedChapter: {
      highlights: [],
      visibleHighlights: {
        all: false,
        fromUser: {
          userId: null,
          visible: false
        }
      }
    },
  },
  actions:{
    getAllChapters({ commit }, bookId) {
      BookDataService.getAllChapters(bookId)
        .then(chapters => {
          commit("setChapters", chapters.data);
          return chapters;
        })
        .catch(err=>{
          console.log("getAllChapters:", err);
          return err;
        })
    },

    getFocusedBook({ commit }, bookId) {
      BookDataService.getBookById(bookId)
        .then(book => {
          commit("setFocusedBook", book.data);
        })
        .catch(err => {
          console.log("getFocusedBook():", err);
        })
    },

    async getChapter({ commit }, payload){
      const { bookId, chapterNum } = payload;

      try {
        const chapter = await BookDataService.getChapter(bookId, chapterNum);
        const highlights = await HighlightService.getAllHighlights(bookId, chapterNum);

        commit("setFocusedChapter", {
          chapter: chapter.data,
          highlights
        });

        return { chapter: chapter.data, highlights };
      } 
      catch (err) {
        console.log("Error in getChapter():", err);
        return { error: err.message };
      }
    },
    async postHighlight({ commit }, payload){
      try {
        const highlight = await HighlightService.postNewHighlight(
          payload.bookId,
          payload.chapterNum,
          payload.startloc,
          payload.endloc,
          payload.fromUser,
          payload.content
        );
        
        if(payload.note) {
          const article = await HighlightService.postHighlightArticle({
              description: payload.note
            },
            highlight.highlightId
          );
          if(highlight.articles) highlight.articles.push(article);
          else highlight.articles = [article];
        }
        commit("setHighlight", highlight);
        return highlight;
      }
      catch(err) {
        console.log("postHighLight():", err);
        return err;
      }
    },

    toggleAllHighlights({ commit }, visible) {
      commit("setAllHighlightsVisibility", visible);
    },

    toggleHighlightsFromUser({ commit }, payload) {
      commit("setHighlightsVisibilityFromUser", payload);
    },
},

mutations:{
    setChapters(state, chapters) {
        state.chapters= chapters;
    },
    clearChapters(state){
        state.chapters={};
    },
    setFocusedBook(state, payload) {
      state.focusedBook = payload;
    },
    setFocusedChapter(state, payload){
        state.focusedChapter = payload.chapter;
        state.focusedChapter["highlights"] = payload.highlights;
    },
    setHighlight(state, highlight) {
      state.focusedChapter.highlights.push(highlight);
    },
    setAllHighlightsVisibility(state, visible) {
      state.focusedChapter["visibleHighlights"] = {
        all: visible
      };
    },
    setHighlightsVisibilityFromUser(state, payload) {
      state.focusedChapter["visibleHighlights"] = {
        fromUser: {
          userId: payload.userId,
          visible: payload.visible
        }
      }
    }
  }
}
