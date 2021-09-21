import React from "react";

const OrderItem = (props) => {
    const { bookItem, orderId, increaseQuantity, decreaseQuantity } = props;
    console.log(bookItem)
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
        </tr>
        );
}

export default OrderItem;