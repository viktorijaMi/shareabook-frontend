import React from "react"

const Register = (props) => {
    return(
       <form>
           <label for="username">Username: </label>
           <input id="username" type="text" name="username"></input>

           <label for="email">Email: </label>
           <input id="email" type="text" name="email"></input>

           <label for="email">Role: </label>
           <input type="radio" name="email" value="ROLE_USER"></input>
           <input type="radio" name="email" value="ROLE_ADMIN"></input>

           <label for="address">Role: </label>
           <input type="address" name="email" value="ROLE_USER"></input>
           <input type="radio" name="email" value="ROLE_ADMIN"></input>
       </form>
    );
}

export default Register;