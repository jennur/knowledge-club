import http from "../http-common";

class HighlightService {
    getAllHighlights(bookId,chapterNum){
        return http.get(`/books/chapters/text/highlights?bookId=${bookId}&chapterNum=${chapterNum}`).then((response)=>{
            return response.data})
    }
    postNewHighlight(bookId,chapterNum,startloc,endloc,fromUser,content=""){
        return http.post(`/books/chapters/text/highlights?bookId=${bookId}&chapterNum=${chapterNum}`,{
            bookId:bookId,
            chapterNum:chapterNum,
            startloc:startloc,
            endloc:endloc,
            fromUser:fromUser,
            content:content,
            timeSent:Date()
        }).then((response)=>{
            
            return response
        })
    }

}

export default new HighlightService();