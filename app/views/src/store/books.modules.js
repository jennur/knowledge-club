import BookDataService from "../services/BookDataService"

export const books = {
    namespaced:true,
    state:{books:[]},
    actions:{
        async getAllBooks({commit}){
            BookDataService.getAll().then(books=>{
                commit('addBooks',books);
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
            state.books = state.books.concat(books);
        }
    }
}
