import { render } from "@testing-library/react";
import React from "react";
import BookTerm from "./BookTerm/BookTerm";

const Books = (props) => {
    console.log("user in books", props.user)
    return (
        <div className="block col-8">
            <h2>Books</h2>
            <div className="row">
                {props.currencies.map((term) => {
                    return (
                    <div className="col-3">
                      <button onClick={() => props.changeCurrency(term)}>
                          {term}
                      </button>  
                    </div>
                )})
                }
            </div>
            <div>
            <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Book image</th>
                            <th scope={"col"}>Book name</th>
                            <th scope={"col"}>Book category</th>
                            <th scope={"col"}>Manufacturer name</th>
                            <th scope={"col"}>Manufacturer address</th>
                            <th scope={"col"}>Book price</th>
                            <th scope={"col"}>Num. of sales</th>
                            <th scope={"col"}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.books.map((term) => {
                                console.log(term)
                                return (
                                    <BookTerm key={term.id} book={term} onAddOrderItem={props.onAddOrderItem} orderId={props.orderId}></BookTerm>
                                )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Books;