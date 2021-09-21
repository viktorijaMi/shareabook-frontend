import React from "react";

const BookTerm = (props) => {
    const { book, orderId } = props;
    return ( 
        <tr>
            <td>
                <img src={book.bookImageUrl} alt="Book image"></img>
            </td>
            <td>{book.bookName}</td>
            <td>{book.category}</td>
            <td>{book.publishedBy.name}</td>
            <td>{book.publishedBy.address.street} {book.publishedBy.address.streetNumber} {book.publishedBy.address.city} {book.publishedBy.address.country}</td>
            <td>
                {book.price.amount} {book.price.currency}
            </td>
            <td>{book.sales}</td>
            <td>
               {orderId !== undefined && <button onClick={() => props.onAddOrderItem(book,1)}>Add to Cart</button>}
            </td>
        </tr>     
        );
}

export default BookTerm;