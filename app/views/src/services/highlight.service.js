import http from "../http-common";

class HighlightService {
  getAllHighlights(bookId,chapterNum){
    return http.get(`/books/chapters/text/highlights?bookId=${bookId}&chapterNum=${chapterNum}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("getAllHighlights:", err.message);
        return err;
      })
  }

  postNewHighlight(payload) {
    return http.post("/books/chapters/text/highlights", {
        ...payload,
        timeSent: new Date()
    }).then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("postNewHighlight:", err.message);
      return err;
    })
  }

  postHighlightArticle(article, highlightId) {
    return http.post("/books/chapters/text/highlights/article", {
      article: {
        description: article.description,
      },
      highlightId
    }).then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log("postHighlightArticle:", err.message);
      return err;
    })
  }
}

export default new HighlightService();