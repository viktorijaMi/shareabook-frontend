import React from "react"

const Register = (props) => {

    const [formData, updateFormData] = React.useState({
        username: "",
        email: "",
        role: "",
        address_street: "",
        address_streetNumber: "",
        address_city: "",
        address_country: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const username = formData.username;
        const email = formData.email;
        const role = formData.role;
        const address_street = formData.address_street;
        const address_streetNumber = formData.address_streetNumber;
        const address_city = formData.address_city;
        const address_country = formData.address_country;
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;


        props.registerUser(username, email, role, address_street, address_streetNumber, address_city, address_country, password, confirmPassword)
    }

    return(
        <div className="container justify-content-center" >
            <div className="row py-4 mt-4 align-items-center">
            <div class="col-md-7 col-lg-6 ml-auto">
                {props.errorMessage !== null && <div className="alert alert-danger" role="alert">
                {props.errorMessage}
                </div>}
                {props.userId !== null && <div class="alert alert-success" role="alert">
                REGISTER SUCCESS! Go to <a href="/login"> Login </a>
                </div>}
                <form onSubmit={onFormSubmit}>
                    <div className="row">
                    <div className="input-group col-lg-6 mb-4">
                        <input type="text"
                               className="form-control bg-white border-left-0 border-md"
                               id="username"
                               name="username"
                               required
                               placeholder="Username"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <input type="text"
                               className="form-control bg-white border-left-0 border-md"
                               id="email"
                               name="email"
                               required
                               placeholder="Email Address"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="input-group mb-4 col-sm-4">
                        <div className="input-group-prepend">
                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                Role
                        </span>
                        </div>
                        <input type="radio"
                               name="role"
                               className="form-input mt-2"
                               required
                               onChange={handleChange}
                               placeholder="ROLE_USER"
                        /> ROLE_USER
                        <input type="radio"
                               name="role"
                               className="form-input mt-2"
                               required
                               placeholder="ROLE_ADMIN"
                               onChange={handleChange}
                        /> ROLE_ADMIN
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <input type="text"
                               className="form-control bg-white border-left-0 border-md"
                               id="address_street"
                               name="address_street"
                               required
                               placeholder="Billing address street"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <div className="input-group-prepend">
                        <span class="input-group-text bg-white px-4 border-md border-right-0">
                                Billing address street number
                        </span>
                        </div>
                        <input type="number"
                               className="form-control bg-white border-left-0 border-md"
                               id="address_streetNumber"
                               name="address_streetNumber"
                               required
                               placeholder="Billing address street number"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <input type="text"
                               className="form-control bg-white border-left-0 border-md"
                               id="address_city"
                               name="address_city"
                               required
                               placeholder="Billing address city"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <input type="text"
                               className="form-control bg-white border-left-0 border-md"
                               id="address_country"
                               name="address_country"
                               required
                               placeholder="Billing address country"
                               onChange={handleChange}
                        />
                    </div>
                    <div class="input-group col-lg-6 mb-4">
                        <input id="password" type="password" name="password" placeholder="Password" class="form-control bg-white border-left-0 border-md"/>
                    </div>
                    <div class="input-group col-lg-6 mb-4">
                        <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm password" class="form-control bg-white border-left-0 border-md"/>
                    </div>
                    <div className="form-group col-lg-12 mx-auto mb-0">
                    <button id="submit" type="submit" className="btn btn-primary btn-block py-2">
                            <span class="font-weight-bold">Create your account</span>                    
                    </button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Register;