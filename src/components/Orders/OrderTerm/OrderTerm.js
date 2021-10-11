import React from "react";
import OrderItem from "../OrderItem/OrderItem";

const OrderTerm = (props) => {
    const { orderItemsList, orderId, increaseQuantity, decreaseQuantity, totalPrice, currencies, changeTotalCurrency, placeOrder, deleteOrderItem, cancelOrder } = props;
    return(
            <aside className="block col-3">
            <h2>Order Items</h2>
            <div>
            {orderItemsList.length === 0 && <div>Cart is empty</div>}
            <div className="row">
            <div className={"table-responsive"}>
            <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Book name</th>
                            <th scope={"col"}>Quantity</th>
                            <th scope={"col"}>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderItemsList.map((bookItem) => {
                          console.log(bookItem);
                          return(
                                  <OrderItem  bookItem = {bookItem} 
                                    orderId = {orderId}
                                    increaseQuantity = {increaseQuantity}
                                    decreaseQuantity = {decreaseQuantity}
                                    deleteOrderItem = {deleteOrderItem}
                                    />
                    );})}
                        </tbody>
                    </table>
            </div>
            </div>
            <hr></hr>
            <div className="row">
            <div className="col-2">
                <strong>Total Price</strong>
            </div>
            <div className="col-5">
                {totalPrice !== null && <strong>{totalPrice.price}{totalPrice.currency}</strong>}
            </div>
            <div className="col-5">
                <strong>Change total price currency</strong>
              {currencies.map((term) => {
                    return (
                    <div className="col-4">
                      <button onClick={() => changeTotalCurrency(term)}>
                          {term}
                      </button>  
                    </div>
                )})
                }
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-8 text-center">
                  {orderItemsList.length > 0 && <button type="button"className="btn btn-warning"onClick={() => placeOrder(totalPrice.currency)}>Place order</button>}
                </div>
                <div className="col-8 text-center">
                  {orderItemsList.length > 0 && <button type="button"className="btn btn-danger"onClick={() => cancelOrder()}>Cancel order</button>}
                </div>
              </div>
            </div> 
            
         </aside>
    );
}

export default OrderTerm;