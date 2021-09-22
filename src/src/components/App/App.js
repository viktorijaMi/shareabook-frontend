import './App.css';

import './App.css';
import React, {Component, useState} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from '../Header/header'
import BookService from '../../Service/BookService';
import OrderService from '../../Service/OrderService';
import AuthService from '../../Service/AuthService';
import Books from '../Books/Books';
import OrderTerm from '../Orders/OrderTerm/OrderTerm';
import OrderList from '../Orders/OrderList/OrderList';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';

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
            billingAddress : {},
            bool : false
        }
        
    }
    render() {
        return (
            <Router>
                <Header user={this.state.loggedUser} logout={this.logoutUser}/>
                    <div className="row">
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
                            <OrderList orders={this.state.orders} loggedUser = {this.state.loggedUser} billingAddress={this.state.billingAddress}></OrderList>
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
            OrderService.getAllOrders(this.state.loggedUser.id.id)
                .then((data) => {
                    this.setState({
                        orders: data.data
                    })
                });
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
           this.getBillingAddress();
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
                    .catch(err => {
                        if (err != null) {
                            this.setState({
                                errorMessage: "REGISTER FAILED! Username already exists or Passwords do not match"})};
                        }
                    )
                        
    }

    loginUser = (username, password) => {
        AuthService.loginUser(username, password)
                    .then((data) => {
                            this.setState({
                                loggedUser: data.data,
                                errorMessage: null,
                                bool : true
                            })
                    })
                    .catch(err => { 
                            this.setState({
                        errorMessage: "Invalid credentials. Try again!"})});
    }

    logoutUser = () => {
        this.setState({
            userId: null,
            loggedUser: null,
            bool : false
        });
    }

    getBillingAddress = () => {
        AuthService.getBillingAddress(this.state.loggedUser.id.id)
                    .then((data) => {
                        this.setState({
                            billingAddress: data.data
                        });
                    })
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
}

export default App;
