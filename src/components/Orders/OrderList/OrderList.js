import React from "react";

const OrderList = (props) => {
    console.log("logged user: ", props.loggedUser);
    return(
        <div className={"container mm-4 mt-5"}>
            <h2 className="text-center">Order List</h2>
            <br/>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Order date and time</th>
                            <th scope={"col"}>Order currency</th>
                            <th scope={"col"}>Order state</th>
                            <th scope={"col"}>Books Ordered (Book name, book quantity, Book price)</th>
                            <th scope={"col"}>Billing address</th>
                            <th scope={"col"}>Order total</th>
                            {props.loggedUser !== undefined && props.loggedUser.role === 'ROLE_ADMIN' && <th scope={"col"}>Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {props.orders.map((term, index) => {
                            console.log("term:", term);
                            return (
                                <tr>
                        <td>{term.orderDate}</td>
                        <td>{term.currency}</td>
                        <td>{term.orderState}</td>
                        <td>
                            {term.orderItemsList.map((orderItem, index1) => {
                                return (
                                <ul>
                                    <div>{orderItem.bookName}   {orderItem.quantity}    {orderItem.itemPrice.amount} {orderItem.itemPrice.currency}</div>
                                </ul>
                                )})}
                        </td>
                        {props.loggedUser !== undefined  && <td>{props.loggedUser.address.street} {props.loggedUser.address.streetNumber} {props.loggedUser.address.city} {props.loggedUser.address.country}</td>}
                        {props.loggedUser === undefined && <td></td>}
                        <td>
                        {term.total.price} {term.total.currency}
                        </td>
                        {props.loggedUser !== undefined && props.loggedUser.role === 'ROLE_ADMIN' &&
                        <td><button className="btn btn-success" onClick={() => props.processOrder(term.id)}>PROCESS ORDER</button></td>
                        }
                        {props.loggedUser !== undefined && props.loggedUser.role === 'ROLE_ADMIN' && <td><button className="btn btn-danger" onClick={() => props.cancelOrder(term.id)}>CANCEL ORDER</button></td>}
                        </tr>
                    )
                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderList;