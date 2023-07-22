import http from "../http-common";
import http_py from "../http-py"

class BookDataService {
  getAll() {
    return http.get("/books")
      .then((response) => {
        return response.data;
      }
      ).catch(err => {
        console.log("Error getting all books:", err);
      });
  }
  rawCreate(file){
    return http_py.post("/books",file,{"Content-Type": 'multipar/form-data'})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return Promise.reject(err);
      })
  }
  getAllChapters(bookId){
    return http.get(`/books/chapters?bookId=${bookId}`)
  }
  getChapter(bookId, chapterNum){
    return http.get(`/books/chapters/text?bookId=${bookId}&chapterNum=${chapterNum}`)
  }

  getBookById(bookId) {
    return http.get(`/book?bookId=${bookId}`);
  }
  create(data) {
    return http.post("/books",data).then((out)=>{
    })
  }
  update(id, data) {
    return http.put(`/books/${id}`, data);
  }
  delete(id) {
    return http.delete(`/books/${id}`);
  }
  deleteAll() {
    return http.delete(`/books`);
  }
  getByTitle(title) {
    return http.get(`/books?title=${title}`);
  }
}
export default new BookDataService();