import axios from "../Custom-axios/auth-axios"


const AuthService = {

    registerUser(username, email, role, billingAddress, password, confirmPassword) {
        return axios.post("/auth/register", {
            "username": username,
            "email" : email,
            "role" : role,
            "billingAddress" : {
                "street": billingAddress.street,
                "streetNumber" : billingAddress.streetNumber,
                "city" : billingAddress.city,
                "country" : billingAddress.country
            },
            "password" : {
                "password" : password
            },
            "confirmPassword" : {
                "password" : confirmPassword
            }
        })
    },

    login(username, password) {
        return axios.post("/auth/login", {
            "username": username,
            "password" : {
                "password" : password
            }
        })
    }
}