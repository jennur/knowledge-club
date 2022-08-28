import http from "../http-common";

class BookDataService {
  getAll() {
    return http.get("/books").then((response)=>{
      return response.data;
    }
    ).catch(err => {
      console.log(err)
    });
  }

  getAllChapters(bookId){
    return http.get(`/books/chapters?bookId=${bookId}`)
  }
  getChapter(bookId, chapterNum){
    return http.get(`/books/chapters/text?bookId=${bookId}&chapterNum=${chapterNum}`)
  }

  get(id) {
    return http.get(`/books/${id}`);
  }
  create(data) {
    return http.post("/books", data);
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