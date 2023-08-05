import highlightChapterContent from "../helpers/highlightFunctions/highlightChapterContent";
import BookDataService from "../services/book.service";
import HighlightService from "../services/highlight.service";

function getCurrentToolTab() {
  const tooltab = localStorage.getItem("current-tool-tab");
  return tooltab || "notes";
}

function getVisibleHighlights() {
  const all = JSON.parse(localStorage.getItem("show-all-highlights"));
  const fromUser = null;
  return { all, fromUser };
}

export const chapters = {
    namespaced:true,
    state: {
      chapters: {},
      focusedbook: {},
      focusedChapter: {
        chapterUUID: null,
        chapterNumber: null,
        chapterName: null,
        chapterContent: null,
        highlightedChapterContent: null,
        highlights: [],
        visibleHighlights: {
          all: false,
          fromUser: {
            userId: null,
            visible: false
          }
        },
        currentToolTab: null,
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
  
      getFocusedBook({ state, commit }, bookId) {
        if(state.focusedBook?.bookUUID !== parseInt(bookId)) {
          BookDataService.getBookById(bookId)
            .then(book => {
              commit("setFocusedBook", book.data);
            })
            .catch((err) => {
              return Promise.reject(err);
            })
        }
      },
  
      async getChapter({ commit }, payload){
        const { bookId, chapterNum } = payload;
  
        try {
          const chapter = await BookDataService.getChapter(bookId, chapterNum);
          const highlights = await HighlightService.getAllHighlights(bookId, chapterNum);
          commit("setFocusedChapter", { chapter: chapter.data, highlights });
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
        localStorage.setItem("current-tool-tab", tab);
        commit("setCurrentToolTab", tab);
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
      setFocusedChapter(state, payload) {
          const { chapter, highlights } = payload;
          const visibleHighlights = getVisibleHighlights();
          const chapterObj = {
            ...chapter,
            highlights,
            currentToolTab: getCurrentToolTab(),
            highlightedChapterContent: highlightChapterContent(
              chapter.chapterContent, highlights
            ),
            visibleHighlights: {
              all: visibleHighlights.all,
              fromUser: visibleHighlights.fromUser
            },
          }

          state.focusedChapter = chapterObj;
      },
      setHighlight(state, highlight) {
        state.focusedChapter.highlights.push(highlight);
      },
      setAllHighlightsVisibility(state, visible) {
        const currentState = state.focusedChapter["visibleHighlights"];
        state.focusedChapter["visibleHighlights"] = {
          ...currentState,
          all: visible
        };
      },
      setHighlightsVisibilityFromUser(state, payload) {
        const currentState = state.focusedChapter["visibleHighlights"];
        state.focusedChapter["visibleHighlights"] = {
          ...currentState,
          fromUser: {
            userId: payload.userId,
            visible: payload.visible
          }
        }
      },
      setCurrentToolTab(state, tab) {
          state.focusedChapter.currentToolTab = tab;
      },
    }
  }
  