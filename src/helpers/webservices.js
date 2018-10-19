import axios from 'axios';

const serviceUrl = "http://localhost:9123/booking-service/";

function getRooms() {
    return axios.get(serviceUrl+'rooms');
}

function getRoomDetails(roomId) {
    return axios.get(serviceUrl+'rooms/'+roomId);
}

function findBookingsByRoomId(roomId) {
    return axios.get(serviceUrl+'rooms/'+roomId+'/bookings');
}

function findAvailableIntervals(roomId, bookingDate) {
    return axios.get(serviceUrl+'rooms/'+roomId+'/availableIntervals?bookingDate='+bookingDate);
}

function findAvailableRooms(bookingDate, fromTime, toTime, nbPersons) {
    const params = {bookingDate, fromTime, toTime, nbPersons};
    return axios.get(serviceUrl+'availableRooms', { params });
}


function bookRoom(bookingDate, fromTime, toTime, nbPersons, roomId) {
    const params = {bookingDate, fromTime, toTime, nbPersons, roomId};
    return axios.post(serviceUrl+'book', params);
}

export default {
    getRooms,
    getRoomDetails,
    findBookingsByRoomId,
    findAvailableIntervals,
    findAvailableRooms,
    bookRoom
}