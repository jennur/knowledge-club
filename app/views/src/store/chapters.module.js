import BookDataService from "../services/book.service";
import HighlightService from "../services/highlight.service";

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
        },
        currentToolTab: "notes"
      },
    },
    actions:{
      getAllChapters({ commit }, bookId) {
        BookDataService.getAllChapters(bookId)
          .then(chapters => {
            commit("setChapters", chapters.data);
            return chapters;
          })
          .catch((err) => {
            return Promise.reject(err);
          })
      },
  
      getFocusedBook({ commit }, bookId) {
        BookDataService.getBookById(bookId)
          .then(book => {
            commit("setFocusedBook", book.data);
          })
          .catch((err) => {
            return Promise.reject(err);
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
        catch(err) {
          return Promise.reject(err);
        }
      },
      async postHighlight({ commit }, payload){
        try {
          const highlight = await HighlightService.postNewHighlight(payload);
          if(payload.note) {
            try {
              const article = await HighlightService.postHighlightArticle({
                  description: payload.note
                },
                highlight.highlightId
              );
              if(highlight.articles) highlight.articles.push(article);
              else highlight.articles = [article];
            }
            catch(err) {
              return Promise.reject(err);
            }
          }
          commit("setHighlight", highlight);
          return highlight;
        }
        catch(err) {
          return Promise.reject(err);
        }
      },
  
      toggleAllHighlights({ commit }, visible) {
        commit("setAllHighlightsVisibility", visible);
      },

      toggleHighlightsFromUser({ commit }, payload) {
        commit("setHighlightsVisibilityFromUser", payload);
      },

      openToolTab({ commit }, tab) {
        commit("setCurrentToolTab", tab);
      }
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
          state.focusedChapter["currentToolTab"] = "notes";
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
      },
      setCurrentToolTab(state, tab) {
          state.focusedChapter.currentToolTab = tab;
      }
    }
  }
  