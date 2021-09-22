import axios from "../Custom-axios/auth-axios"


const AuthService = {

    registerUser(username, email, role, billingAddress_streetName, billingAddress_streetNumber, billingAddress_streetCity, billingAddress_streetCountry, password, confirmPassword) {
        return axios.post("/auth/register", {
            "username": username,
            "email" : email,
            "role" : role,
            "address" : {
                "street": billingAddress_streetName,
                "streetNumber" : billingAddress_streetNumber,
                "city" : billingAddress_streetCity,
                "country" : billingAddress_streetCountry
            },
            "password" : password,
            "confirmPassword": confirmPassword
        
        })
    },

    loginUser(username, password) {
        return axios.post("/auth/login", {
            "username": username,
            "password" : password
        })
    },

    getBillingAddress(id) {
        return axios.get(`/auth/user-address/${id}`)
    }
}

export default AuthService;