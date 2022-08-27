import BookDataService from "../services/BookDataService"

export const books = {
    namespaced:true,
    state:{books:[]},
    actions:{
        async getAllBooks({commit}){
            BookDataService.getAll().then(books=>{
                commit("clearBooks");
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
        },
        
        clearBooks(state){
            state.books = []
        }
    }
}

export const chapters = {
    namespaced:true,
    state:{chapters:{},focusedbook:""},
    actions:{
        async getAllChapters({commit},bookid){
            BookDataService.getAllChapters(bookid).then(chapters=>{
                commit("addChapters");
            }).catch(err=>{
                console.log(err);
            })
        }

    },
    mutations:{
        addChapters(state,chapters){
            state.chapters = state.books.concat(chapters);
        },
        clearChapters(state){
            state.chapters={}
        }
    }
}
