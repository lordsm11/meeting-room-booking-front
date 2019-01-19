import axios from 'axios';

const serviceUrl = "http://devakt.ddns.net:9124/booking-service/";

function login(email, password) {
    const params = {email, password};
    return axios.post(serviceUrl+'login', params);
}

export default {
    login
}