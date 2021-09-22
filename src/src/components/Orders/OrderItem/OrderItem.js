import React from "react";

const OrderItem = (props) => {
    const { bookItem, orderId, increaseQuantity, decreaseQuantity, deleteOrderItem } = props;
    return (
      <tr>
            <td>{bookItem.bookName}</td>
            <td className="col-2">
                <button onClick={() => decreaseQuantity(bookItem)} className="remove">
                    -
                </button>{' '} {bookItem.quantity  } {' '}
                <button onClick={() => increaseQuantity(bookItem)} className="add">
                    +
                </button>
            </td>
            <td>
                {bookItem.quantity} x
                {bookItem.itemPrice.amount}{bookItem.itemPrice.currency}
            </td>
            <td><button className="btn btn-danger" onClick={() => deleteOrderItem(bookItem)}>DELETE</button></td>
        </tr>
        );
}

export default OrderItem;