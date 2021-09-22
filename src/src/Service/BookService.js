import axios from '../Custom-axios/book-axios';

const BookService = {

    getBooks: () => {
        return axios.get("/book");
    },

    addBook: (bookName, price, category) => {
    return axios.post("/book", {
        "bookName" : bookName,
        "price": price,
        "sales" : 0,
        "category" : category
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
    }

}

export default BookService;