import axios from '../Custom-axios/book-axios';

const BookService = {

    getBooks: () => {
        return axios.get("/book");
    },

    addBook: (bookName, price, quantity, category, publisher, bookImageUrl) => {
        return axios.post("/book", {
            "bookName" : bookName,
            "price": price,
            "sales" : 0,
            "quantity" : quantity, 
            "category" : category,
            "publisher" : publisher,
            "bookImageUrl" : bookImageUrl
        });
    },

    getBookName: (id) => {
        return axios.get(`/book/${id}`);
    },

    changeCurrency: (currency) => {
        return axios.get("/book/change-currency", {
            params : {
                "currency" : currency
            }
        })
    },

    getBookCategories : () => {
        return axios.get("/book/categories");
    },

    getPublishers: () => {
        return axios.get("/book/publishers");
    }
}

export default BookService;