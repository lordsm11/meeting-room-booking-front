import axios from 'axios';

const serviceUrl = "http://localhost:9123/booking-service/";

function login(email, password) {
    const params = {email, password};
    return axios.post(serviceUrl+'login', params);
}

export default {
    login
}