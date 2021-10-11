import React from 'react';
import {useHistory} from 'react-router-dom';

const BookAdd = (props) => {
    console.log("publishers", props.publishers);
    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        bookName: "",
        price: 0,
        quantity: 0,
        category: 1,
        publisher: "",
        bookImageUrl: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log("form data", formData);
        const bookName = formData.bookName;
        const price = formData.price;
        const quantity = formData.quantity;
        const category = formData.category;
        const publisher = formData.publisher;
        const bookImageUrl = formData.bookImageUrl;

        props.onAddBook(bookName, price, quantity, category, publisher, bookImageUrl);
        history.push("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="bookName">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="bookName"
                               name="bookName"
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number"
                               className="form-control"
                               id="price"
                               name="price"
                               placeholder="Price"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number"
                               className="form-control"
                               id="quantity"
                               name="quantity"
                               placeholder="Quantity"
                               required
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.bookCategories.map((term) =>
                                <option value={term}>{term}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Publisher</label>
                        <select name="publisher" className="form-control" onChange={handleChange}>
                            {props.publishers.map((term) =>
                                <option value={term.name}>{term.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bookImageUrl">Book image URL</label>
                        <input type="text"
                               className="form-control"
                               id="bookImageUrl"
                               name="bookImageUrl"
                               required
                               placeholder="Enter book image url"
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;
