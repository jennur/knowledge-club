import BookDataService from "../services/BookDataService"

export const books = {
    namespaced:true,
    state:{books:[]},
    actions:{
        async getAllBooks({commit}){
            BookDataService.getAll().then(books=>{
                console.log(books);
                commit('addBook',books);
            }).catch(err=>{
                console.log(err)
            });
        }
    },
    mutations:{
        addBook(state,book){
            state.books.push(book);
        },
        addBooks(state,books){
            state.books.concat(books);
        }
    }
}
