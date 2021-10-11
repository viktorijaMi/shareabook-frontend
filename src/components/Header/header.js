import React from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
const Header = (props) => {
    const history = useHistory();

    const onLogoutClick = () => {
        props.logout();
        history.push("/login");
    }
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
                <a className="navbar-brand" href="/books">Share a book</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to={"/books"}>Books</Link>
                        </li>
                        <li className="nav-item active">
                            {props.user !== undefined && <Link className="nav-link" to={"/orders"}>Orders</Link>}
                        </li>
                        <li className="nav-item active">
                            {props.user !== undefined && props.user.role === 'ROLE_ADMIN' && <Link className="nav-link" to={"/add-book"}>Add new book</Link>}
                        </li>
                    </ul>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                       {props.user === undefined && <Link className="btn btn-outline-info my-2 my-sm-0" to={"/register"}>Register</Link>}
                    </form>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                       {props.user === undefined && <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>}
                    </form>
                    <form className="form-inline mt-2 mt-md-0 ml-3">
                        {props.user !== undefined && <button className="btn btn-info" onClick={() => {onLogoutClick()}}>LOGOUT</button>}
                    </form>

                </div>
            </nav>
        </header>
    )
}

export default Header;