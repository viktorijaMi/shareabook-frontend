import './App.css';
import React, {Component, useState} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from '../Header/Header'
import BookService from '../../Service/BookService';
import OrderService from '../../Service/OrderService';
import AuthService from '../../Service/AuthService';
import Books from '../Books/Books';
import OrderTerm from '../Orders/OrderTerm/OrderTerm';
import OrderList from '../Orders/OrderList/OrderList';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';
import UserService from '../../Service/UserService';
import { authFailure, authSuccess } from '../../Redux/authActions';
import BookAdd from '../Books/BookAdd/BookAdd';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            orderItemsList: [],
            orderId : undefined,
            total: null,
            currencies: [],
            orders: [],
            loggedUser : undefined,
            errorMessage : null,
            userId : null,
            bool : false,
            bookCategories: [],
            publishers: []
        }
    }
    render() {
        return (
            <Router>
                <Header user={this.state.loggedUser} logout={this.logoutUser}/>
                    <div style={{backgroundImage: `url("https://t3.ftcdn.net/jpg/03/48/29/16/360_F_348291651_3CXlnV4Fd3JnyWQ3GwkPrxMVrHUqq58j.jpg")`, backgroundSize: `100%`}}>
                        <Route path={"/register"}>
                            <Register registerUser={this.registerUser} errorMessage={this.state.errorMessage} userId={this.state.userId}></Register>
                        </Route>
                        <Route path={"/login"}>
                            <Login loginUser={this.loginUser} errorMessage={this.state.errorMessage}></Login>
                        </Route>
                        <Route path={"/books"}>
                            <Books books={this.state.books} 
                                onAddOrderItem={this.addOrderItem} 
                                currencies={this.state.currencies}
                                changeCurrency={this.changeCurrency}
                                orderId={this.state.orderId}
                                user={this.state.loggedUser}/>
                            {this.state.orderId === undefined && this.state.loggedUser !== undefined && <button onClick={this.createOrder}> Create new order</button>}
                            {this.state.orderId !== undefined && <OrderTerm orderId = {this.state.orderId} 
                                                                            orderItemsList={this.state.orderItemsList} 
                                                                            getSelectedBookName = {this.getSelectedBookName}
                                                                            increaseQuantity = {this.increaseQuantity}
                                                                            decreaseQuantity = {this.decreaseQuantity}
                                                                            totalPrice = {this.state.total}
                                                                            currencies = {this.state.currencies}
                                                                            changeTotalCurrency = {this.changeTotalCurrency}
                                                                            placeOrder = {this.placeOrder}
                                                                            deleteOrderItem={this.deleteOrderItem}
                                                                            cancelOrder={this.cancelOrder}
                                                                            />}
                        </Route>
                        <Route path={"/orders"}>
                            <OrderList orders={this.state.orders} loggedUser = {this.state.loggedUser} processOrder={this.adminProcessOrder} cancelOrder={this.adminCancelOrder}></OrderList>
                        </Route>
                        <Route path="/add-book">
                            <BookAdd bookCategories={this.state.bookCategories} publishers={this.state.publishers} onAddBook={this.onAddBook}></BookAdd>
                        </Route>
                    </div>   
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCurrencies();
        this.loadAllOrders();
    }

    loadAllOrders() {
        if (this.state.bool) {
            if (this.state.loggedUser.role == 'ROLE_USER') {
                OrderService.getAllOrdersByUserId(this.state.loggedUser.id.id)
                .then((data) => {
                    this.setState({
                        orders: data.data
                    })
                });
            } else {
                OrderService.getAllOrders()
                .then((data) => {
                    this.setState({
                        orders: data.data
                    })
                });
            }
            
        } 
    }

    loadBooks = () => {
        BookService.getBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCurrencies = () => {
        OrderService.getCurrencies()
                    .then((data) => {
                        this.setState({
                            currencies: data.data
                        })
                    })
    }

    changeCurrency = (currency) => {
        BookService.changeCurrency(currency)
        .then(() => {
            this.loadBooks();
        })
    }

    changeTotalCurrency = (currency) => {
        OrderService.changeCurrency(this.state.orderId.id, currency)
            .then((data) => {
                this.setState({
                    total: data.data
                })
            })
    }

   createOrder = () => {
       OrderService.createOrder(this.state.loggedUser)
            .then((data) => {
                this.setState({
                    orderId: data.data
                })
            });
   }

   addOrderItem = (book, quantity) => {
       OrderService.addItem(this.state.orderId.id, book, quantity)
                .then((data) => {
                    let orderItem = data.data
                    let listOrderItems = [...this.state.orderItemsList]

                    listOrderItems.push(orderItem)
                    this.setState({
                        orderItemsList: listOrderItems,
                    })
                    this.getTotalPrice();
                });
   }

   getSelectedBookName = (bookId) => {
       BookService.getBookName(bookId).then();
   }

   loadOrderItems = () => {
       OrderService.getItemsById(this.state.orderId.id)
                    .then((data) => {
                        this.setState({
                            orderItemsList: data.data
                        })
                        this.getTotalPrice(this.state.orderId);
                    });
   } 

   placeOrder = (currency) => {
       OrderService.placeOrder(this.state.orderId.id, currency)
       .then((data) => {
           this.setState({
               orderId: undefined,
               orderItemsList: []
           })
           this.loadAllOrders();
       })
   }

   increaseQuantity = (orderItem) => {
       OrderService.increaseQuantity(this.state.orderId.id, orderItem.id)
                    .then(() => {
                        this.loadOrderItems()
                    }
                    );
   }

   decreaseQuantity = (orderItem) => {
    OrderService.decreaseQuantity(this.state.orderId.id, orderItem.id)
                 .then(() => {
                    this.loadOrderItems()
                 }
                 );
                }

    getTotalPrice = () => {
        OrderService.getTotalPrice(this.state.orderId.id)
                    .then((data) => {
                        this.setState({
                            total : data.data
                        }
                        )
                    })
    }

    registerUser = (username, email, role, billingAddress_streetName, billingAddress_streetNumber, billingAddress_streetCity, billingAddress_streetCountry, password, confirmPassword) => {
        AuthService.registerUser(username, email, role, billingAddress_streetName, billingAddress_streetNumber, billingAddress_streetCity, billingAddress_streetCountry, password, confirmPassword)
                    .then((data) => {
                        this.setState({
                            userId: data.data,
                            errorMessage: null
                        });
                    })             
    }

    loginUser = (username, password) => {
        AuthService.loginUser(username, password).then((response)=>{
            if(response.status===200){
                authSuccess(response.data);
            }
            else{
               authFailure('Something Wrong!Please Try Again'); 
            }
            this.getUser(username);
        }).catch((err)=>{

            if(err && err.response){
            
            switch(err.response.status){
                case 401:
                    console.log("401 status");
                    authFailure("Authentication Failed.Bad Credentials");
                    break;
                default:
                    authFailure('Something Wrong!Please Try Again'); 

            }

            }
            else{
                authFailure('Something Wrong!Please Try Again');
            }
                
        });
    }

    getUser = (username) => {
        UserService.getUserByUsername(username)
                    .then((data) => {
                            this.setState({
                                loggedUser: data.data,
                                errorMessage: null,
                                bool : true
                            })
                            this.loadAllOrders();
                            this.getPublishers();
                            this.getBookCategories();
                    });
    }
    
    logoutUser = () => {
        this.setState({
            userId: null,
            loggedUser: undefined,
            bool : false
        });
        
    }

    deleteOrderItem = (orderItem) => {
        OrderService.deleteOrderItem(this.state.orderId.id, orderItem.id)
                    .then(
                        this.loadOrderItems()
                    )
    }

    cancelOrder = () => {
        OrderService.cancelOrder(this.state.orderId.id)
                    .then(
                        this.setState({
                            orderId: undefined
                        })
                    )
    }

    onAddBook = (bookName, price, quantity, category, publisher, bookImageUrl) => {
        BookService.addBook(bookName, price, quantity, category, publisher, bookImageUrl)
                    .then(() => {
                        this.loadBooks();
                    });
    }

    getBookCategories = () => {
        if (this.state.loggedUser.role === 'ROLE_ADMIN') {
            BookService.getBookCategories()
                    .then(data => {
                        this.setState({
                            bookCategories: data.data
                        })
                    });
        }
    }

    getPublishers = () => {
        if (this.state.loggedUser.role === 'ROLE_ADMIN') {
        BookService.getPublishers()
                    .then(data => {
                        this.setState({
                            publishers: data.data
                        })
                    });
                }
    }

    adminProcessOrder = (orderId) => {
        OrderService.processOrder(orderId.id)
                    .then(
                        this.loadAllOrders()
                    );
    }

    adminCancelOrder = (orderId) => {
        OrderService.cancelOrder(orderId.id)
                    .then(
                        this.loadAllOrders()
                    );
    }
}

export default App;
