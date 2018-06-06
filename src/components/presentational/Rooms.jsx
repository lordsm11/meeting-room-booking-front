import React, {Component} from 'react';
import apiCallService from '../../helpers/apiCallService';
import { Button, Form, Select, Table } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import Moment from 'moment';

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleIntervalChange = this.handleIntervalChange.bind(this);
        this.handleBookingDateChange = this.handleBookingDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        var self = this;
        apiCallService.getRooms()
                .then(function (response) {
                    self.setState({...self.state, rooms: response.data});
                });
        apiCallService.getIntervals()
                .then(function (response) {
                    let intervalsFrom = [];
                    response.data.forEach(s => intervalsFrom.push({key: s.fromTimeInt, text: s.fromTime, value: s.fromTimeInt }));
                    let intervalsTo = [];
                    response.data.forEach(s => intervalsTo.push({key: s.toTimeInt, text: s.toTime, value: s.toTimeInt }));
                    self.setState({...self.state, intervalsFrom, intervalsTo});
                });
    }

    handleBookingDateChange(bookingDate) {
        console.log(bookingDate);
        this.setState({bookingDate});
    }

    handleIntervalChange(e, data) {
        this.setState({[data.name]:data.value});
    }

    handleChange(e, data) {
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var self = this;
        apiCallService.findAvailableRooms(Moment(this.state.bookingDate).format('DD/MM/YYYY'), this.state.fromTime, this.state.toTime, this.state.nbPersons)
                .then(function (response) {
                    self.setState({...self.state, rooms:
                    response.data});
                });
    }

    renderRooms () {
        const rooms = this.state.rooms;
        if(!rooms) {
            return (<h3>No rooms available</h3>);
        }

        const roomsView = rooms.map((room, id) => (
                        <Table.Row key={id}>
                            <Table.Cell>{room.name}</Table.Cell>
                            <Table.Cell>{room.description}</Table.Cell>
                            <Table.Cell>{room.nbPersons}</Table.Cell>
                            <Table.Cell><Link to={"rooms/"+room.id + "/bookings"}>Bookings</Link></Table.Cell>
                        </Table.Row>
                ));

        return (
                <div>
                <h3>{this.state.rooms.length} meeting rooms found</h3>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Decription</Table.HeaderCell>
                            <Table.HeaderCell>Capacity</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {roomsView}
                    </Table.Body>
                </Table>
                </div>
        );
    }

    render() {
        const enabled = this.state.bookingDate && this.state.fromTime && this.state.toTime && this.state.nbPersons;
        return (
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Date de la réunion</label>
                            <DatePicker
                                    selected={this.state.bookingDate}
                                    onChange={this.handleBookingDateChange}
                                    dateFormat="DD/MM/YYYY"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Heure de début</label>
                            <Select name="fromTime" onChange={this.handleIntervalChange} options={this.state.intervalsFrom ? this.state.intervalsFrom : []} />
                        </Form.Field>
                        <Form.Field>
                            <label>Heure de fin</label>
                            <Select name="toTime" onChange={this.handleIntervalChange} options={this.state.intervalsTo ? this.state.intervalsTo : []} />
                        </Form.Field>
                        <Form.Field>
                            <label>Nombre de personnes</label>
                            <input name="nbPersons" onChange={this.handleChange} />
                        </Form.Field>
                        <Button disabled={!enabled} type='submit'>Submit</Button>
                        </Form.Group>
                    </Form>

                    {this.renderRooms()}
                </div>
        );
    }
}

export default Rooms;