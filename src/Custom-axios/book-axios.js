import axios from "axios";

const istance = axios.create({
    baseURL: 'http://localhost:9091/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Authorization':'Bearer '+localStorage.getItem("USER_KEY")
    }
})

export default istance;