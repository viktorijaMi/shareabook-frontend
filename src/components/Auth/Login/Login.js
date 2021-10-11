import React from "react";
import { useHistory } from "react-router-dom";
import { authenticate } from '../../../Redux/authActions';

const Login = (props) => {

    const history = useHistory()

    const [formData, updateFormData] = React.useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        authenticate();
        const username = formData.username;
        const password = formData.password;


        props.loginUser(username, password);
        history.push({pathname: '/books'})
    }

    return(
        <div className="container-flex py-5" style={{height: `650px`}}>
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-col" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <div className="col-md-5">
                            {props.errorMessage !== null && <div class="alert alert-danger" role="alert">
                            {props.errorMessage}
                            </div>}
                            <form id="login-form" className="form" onSubmit={onFormSubmit}>
                                <div className="form-group col-md-12 py-2">
                                    <label htmlFor="username">Username</label>
                                    <input type="text"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        required
                                        placeholder="Enter username"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-12 py-2">
                                    <label htmlFor="password">Password</label>
                                    <input type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        placeholder="Enter password"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-12 py-4">
                                <button id="submit" type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;