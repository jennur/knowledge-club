import http from "../http-common";
import http_py from "../http-py"

class BookDataService {
  rawCreate(file) {
    return http_py.post("/books", file, {"Content-Type": 'multipar/form-data'})
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.error("[Y]", err);
        return Promise.reject(err);
      });
  }
  create(data) {
    return http.post("/books", data)
      .then((response) => {
        console.log("[Y]", response.data.message);
      })
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  getAll() {
    return http.get("/books")
      .then((response) => {
        return response.data;
      })
      .catch(err => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  getBooks() {
    return http.get("/books", { params })
      .then((response) => {
        return response.data;
      })
      .catch(err => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  getBookById(bookId) {
    return http.get(`/book?bookId=${bookId}`)
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  getByTitle(title) {
    return http.get(`/books?title=${title}`)
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  getAllChapters(bookId) {
    return http.get(`/books/chapters?bookId=${bookId}`)
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  getChapter(bookId, chapterNum){
    return http.get(`/books/chapters/text?bookId=${bookId}&chapterNum=${chapterNum}`)
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  update(bookId, data) {
    return http.put(`/books/${bookId}`, data)
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  delete(bookId) {
    return http.get(`/books/delete?bookId=${bookId}`)
      .then((response) => {
        console.log("[Y]", response.data.message || "Removed book");
        return response;
      })
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
  deleteAll() {
    return http.get(`/books`)
      .catch((err) => {
        console.error("[Y]", err.response.data.message || err.message);
        return Promise.reject(err);
      });
  }
}
export default new BookDataService();