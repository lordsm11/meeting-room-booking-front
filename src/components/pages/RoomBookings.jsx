import React, {Component} from 'react';
import bookingApi from 'api/bookingApi';
import {Label} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import timeHelper from 'helpers/timeHelper';
import stringUtils from 'helpers/stringUtils';

class RoomBookings extends Component {

    componentWillMount() {
        const roomId = this.props.match.params.roomId;
        const bookingDate = timeHelper.getMoment();
        this.setState({
            bookingDate 
        });

        bookingApi.getRoomDetails(roomId)
        .then((response) => {
            this.setState({room: response.data});
        });

        bookingApi.findBookingsByRoomId(roomId)
        .then((response) => {
            this.setState({allBookings: response.data, bookings: response.data});
        });

        bookingApi.findAvailableIntervals(roomId, bookingDate)
        .then((response) => {
            this.setState({availableBookings: response.data});
        });
    }

    renderRoomDetails () {
        const room = this.state.room;
        if(!room) {
            return null;
        }
        return (
            <div className="ui message">
            <div className="header">
              Salle {room.name}
            </div>
            <ul className="list">
                <li>Description : {room.description}</li>
                <li>Etage : {room.floor}</li>
                <li>Département : {room.description}</li>
                <li>Capacité : {room.nbPersons}</li>
            </ul>
          </div>
        );
    }

    renderMeetings () {
        const bookings = this.state.bookings;
        
        let meetingsView;
        if(!bookings || bookings.length === 0) {
            meetingsView = <li>Aucune réservation</li>;
        } else {
            meetingsView = bookings.map((booking, id) => (
                <li key={id}>{stringUtils.formatRoomBooking(booking)}</li>
            ));
        }
 
        return (
            <div className="ui message">
                <DatePicker
                    selected={this.state.bookingDate}
                    onChange={this.handleChangeDate}
                    dateFormat={timeHelper.DATE_FORMAT}
                />
                <div className="header">
                    Liste des réservations du {timeHelper.momentToString(this.state.bookingDate)}
                </div>
                <ul className="list">
                    {meetingsView}
                </ul>
            </div>
        );
    }

    renderAvailableBookings() {
        const availableBookings = this.state.availableBookings;
        return availableBookings ? availableBookings.map((availableBooking, id) => (
                        <Label key={id} as='a' basic>{availableBooking.fromTime}:{availableBooking.toTime}</Label>
                )) : '';
    }

    render() {
        return (
            <div>
                {this.renderRoomDetails()}
                {this.renderMeetings()}
            </div>
        );
    }

    handleChangeDate = (bookingDate) => {
        const roomId = this.props.match.params.roomId;
        const bookingDateStr = timeHelper.momentToString(bookingDate);
        bookingApi.findAvailableIntervals(roomId, bookingDateStr)
                .then((response) => {
                    this.setState({
                        bookingDate: bookingDate,
                        bookings: this.state.allBookings.filter((b) => b.bookingDate === bookingDateStr),
                        availableBookings: response.data
                    });
                });
    }
}

export default RoomBookings;
