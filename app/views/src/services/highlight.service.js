import http from "../http-common";

class HighlightService {
    getAllHighlights(bookId,chapterNum){
        return http.get(`/books/chapters/text/highlights?bookId=${bookId}&chapterNum=${chapterNum}`)
          .then((response) => {
            return response.data
          })
          .catch((err) => {
            console.log("getAllHighlights:", err);
            return err;
          })
    }
    postNewHighlight(bookId,chapterNum,startloc,endloc,fromUser,content=""){
        return http.post(`/books/chapters/text/highlights?bookId=${bookId}&chapterNum=${chapterNum}`,{
            bookId,
            chapterNum,
            startloc,
            endloc,
            fromUser,
            content,
            timeSent: new Date()
        }).then((response) => {
          return response
        })
        .catch((err) => {
          console.log("postNewHighlight:", err);
          return err;
        })
    }

}

export default new HighlightService();