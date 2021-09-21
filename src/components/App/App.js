import './App.css';

import './App.css';
import React, {Component, useState} from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from '../Header/header'
import BookService from '../../Service/BookService';
import OrderService from '../../Service/OrderService'
import Books from '../Books/Books'
import OrderTerm from '../Orders/OrderTerm/OrderTerm'
import OrderList from '../Orders/OrderList/OrderList';

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
            totals: []
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                    <div className="row">
                        <Route path={"/book"}>
                            <Books books={this.state.books} 
                                onAddOrderItem={this.addOrderItem} 
                                currencies={this.state.currencies}
                                changeCurrency={this.changeCurrency}
                                orderId={this.state.orderId}/>
                            {this.state.orderId === undefined && <button onClick={this.createOrder}> Create new order</button>}
                            {this.state.orderId !== undefined && <OrderTerm orderId = {this.state.orderId} 
                                                                            orderItemsList={this.state.orderItemsList} 
                                                                            getSelectedBookName = {this.getSelectedBookName}
                                                                            increaseQuantity = {this.increaseQuantity}
                                                                            decreaseQuantity = {this.decreaseQuantity}
                                                                            totalPrice = {this.state.total}
                                                                            currencies = {this.state.currencies}
                                                                            changeTotalCurrency = {this.changeTotalCurrency}
                                                                            placeOrder = {this.placeOrder}
                                                                            />}
                        </Route>
                        <Route path={"/orders"}>
                            <OrderList orders={this.state.orders} totals={this.state.totals}></OrderList>
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
        OrderService.getAllOrders()
                .then((data) => {
                    this.setState({
                        orders: data.data
                    })
                });
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
       OrderService.createOrder()
            .then((data) => {
                console.log(data.data);
                this.setState({
                    orderId: data.data
                })
            });
   }

   addOrderItem = (book, quantity) => {
       console.log("order id: ", this.state.orderId)
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


}

export default App;
