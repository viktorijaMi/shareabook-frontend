import React from "react";

const OrderList = (props) => {
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
                        </tr>
                        </thead>
                        <tbody>
                        {props.orders.map((term, index) => {
                            return (
                                <tr>
                        <td>{term.orderDate}</td>
                        <td>{term.currency}</td>
                        <td>{term.orderState}</td>
                        <td>
                            {term.orderItemsList.map((orderItem, index1) => {
                                console.log("user in order list", props.loggedUser);
                                console.log("billing address", props.billingAddress);
                                return (
                                <ul>
                                    <div>{orderItem.bookName}   {orderItem.quantity}    {orderItem.itemPrice.amount} {orderItem.itemPrice.currency}</div>
                                </ul>
                                )})}
                        </td>
                        {props.loggedUser !== undefined && props.billingAddress !== {} && <td>{props.billingAddress.street} {props.billingAddress.streetNumber} {props.billingAddress.city} {props.billingAddress.country}</td>}
                        {props.loggedUser === undefined && <td></td>}
                        <td>
                        {term.total.amount} {term.total.currency}
                        </td>
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