import axios from 'axios';

const serviceUrl = "http://localhost:9123/booking-service/";

function getRooms() {
    return axios.get(serviceUrl+'rooms');
}

function getRoomDetails(roomId) {
    return axios.get(serviceUrl+'rooms/'+roomId);
}

function findBookings(email) {
    return axios.get(serviceUrl+'bookings/users/'+email);
}

function findBookingsByRoomId(roomId) {
    return axios.get(serviceUrl+'bookings/rooms/'+roomId);
}

function findAvailableIntervals(roomId, bookingDate) {
    return axios.get(serviceUrl+'rooms/'+roomId+'/availableIntervals?bookingDate='+bookingDate);
}

function findAvailableRooms(bookingDate, fromTime, toTime, nbPersons) {
    const params = {bookingDate, fromTime, toTime, nbPersons};
    return axios.get(serviceUrl+'rooms/available', { params });
}

function bookRoom(bookingDate, fromTime, toTime, nbPersons, roomId, email) {
    const params = {bookingDate, fromTime, toTime, nbPersons, roomId, email};
    return axios.post(serviceUrl+'book', params);
}

function deleteBooking(bookingId) {
    return axios.delete(serviceUrl+'bookings/'+bookingId);
}

export default {
    getRooms,
    getRoomDetails,
    findBookingsByRoomId,
    findAvailableIntervals,
    findAvailableRooms,
    bookRoom,
    findBookings,
    deleteBooking
}