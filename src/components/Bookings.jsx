import React, {Component} from 'react';
import webservices from 'helpers/webservices';
import {Label, Table} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import timeHelper from 'helpers/timeHelper';

class Bookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: timeHelper.getMoment()
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        var self = this;
        const roomId = this.props.match.params.roomId;
        const bookingDate = this.state.bookingDate;

        webservices.getRoomDetails(roomId)
                .then(function (response) {
                    self.setState({...self.state, room: response.data});
                });

        webservices.findBookingsByRoomId(roomId)
                .then(function (response) {
                    self.setState({...self.state, allBookings: response.data, bookings: response.data});
                });

        webservices.findAvailableIntervals(roomId, bookingDate)
                .then(function (response) {
                    self.setState({...self.state, availableBookings: response.data});
                });
    }

    renderRoomDetails () {
        const room = this.state.room;
        if(!room) {
            return null;
        }
        return (
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>description</Table.HeaderCell>
                            <Table.HeaderCell>floor</Table.HeaderCell>
                            <Table.HeaderCell>department</Table.HeaderCell>
                            <Table.HeaderCell>name</Table.HeaderCell>
                            <Table.HeaderCell>Capacity</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{room.id}</Table.Cell>
                            <Table.Cell>{room.description}</Table.Cell>
                            <Table.Cell>{room.floor}</Table.Cell>
                            <Table.Cell>{room.department}</Table.Cell>
                            <Table.Cell>{room.name}</Table.Cell>
                            <Table.Cell>{room.nbPersons}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
        );
    }

    renderMeetings () {
        const bookings = this.state.bookings;
        if(!bookings) {
            return null;
        }

        var meetingsView = bookings ? bookings.map((booking, id) => (
                        <Table.Row key={id}>
                            <Table.Cell>{booking.bookingDate}</Table.Cell>
                            <Table.Cell>{booking.fromTime}</Table.Cell>
                            <Table.Cell>{booking.toTime}</Table.Cell>
                            <Table.Cell>{booking.nbPersons}</Table.Cell>
                        </Table.Row>
                )) : '';

        return (
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>To</Table.HeaderCell>
                            <Table.HeaderCell>Capacity</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {meetingsView}
                    </Table.Body>
                </Table>
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
                     <h3>Room Details</h3>
                    {this.renderRoomDetails()}

                    <h3>Filter bookings by date : </h3>
                    <DatePicker
                            selected={this.state.bookingDate}
                            onChange={this.handleChange}
                            dateFormat={timeHelper.DATE_FORMAT}
                    />

                    <h3>List of meetings</h3>
                    {this.renderMeetings()}

                    <h3>Available times</h3>
                    {this.renderAvailableBookings()}
                </div>
        );
    }

    handleChange(bookingDate) {
        const self = this;
        const roomId = this.props.match.params.roomId;
        const bookingDateStr = timeHelper.momentToString(bookingDate);
        webservices.findAvailableIntervals(roomId, bookingDateStr)
                .then(function (response) {
                    self.setState({
                        bookingDate: bookingDate,
                        bookings: self.state.allBookings.filter((b) => b.bookingDate === bookingDateStr),
                        availableBookings: response.data
                    });
                });
    }
}

export default Bookings;
