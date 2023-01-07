import axios from "axios";
const request = axios.create({
    timeout: 6000
});

export default request
