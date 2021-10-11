import axios from '../Custom-axios/auth-axios'

const UserService = {

    getUserById: (id) => {
        return axios.get(`/user/${id}`,
        {
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem("USER_KEY")
            }
        })
    },
    getUserByUsername: (username) => {
        console.log("token: ", localStorage.getItem("USER_KEY"))
        return axios.get(`/user/username`,
        {
            params: {
                "username" : username
            },
            headers:{
                'Authorization':'Bearer '+ localStorage.getItem("USER_KEY")
            }
        })
    }
}

export default UserService;