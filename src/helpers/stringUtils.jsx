import timeHelper from 'helpers/timeHelper';

function formatAccountBooking(booking) {
    return `Salle ${booking.roomName} : Le ${booking.bookingDate} De ${timeHelper.formatTime(booking.fromTime)}`
    + ` A ${timeHelper.formatTime(booking.toTime)} pour ${formatNbPersons(booking.nbPersons)}`;
}

function formatRoomBooking(booking) {
    return `De ${timeHelper.formatTime(booking.fromTime)} A ${timeHelper.formatTime(booking.toTime)} pour ${formatNbPersons(booking.nbPersons)}`;
}

function formatBookSuccessMessage(roomName, bookingDate, fromTime, toTime, nbPersons) {
    return `Salle ${roomName} réservée le ${bookingDate} de ${timeHelper.formatTime(fromTime)} à ${timeHelper.formatTime(toTime)}` 
    + ` pour ${formatNbPersons(nbPersons)}`;
}

function formatNbPersons(nbPersons) {
    if(nbPersons === 0) {
        return 'aucune personne';
    }
    if(nbPersons === 1) {
        return 'une personne';
    }
    return `${nbPersons} personnes`;
}

export default {
    formatAccountBooking,
    formatRoomBooking,
    formatBookSuccessMessage
}