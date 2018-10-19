import React, {Component} from 'react';
import webservices from 'helpers/webservices';
import timeHelper from 'helpers/timeHelper';
import { Button, Form, Select } from 'semantic-ui-react'

import DatePicker from 'react-datepicker';

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import RoomsView from 'components/fragments/RoomsView';

class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: timeHelper.getMoment()
        };
    }

    componentWillMount() {
        this.setState({
            intervalsFrom: timeHelper.createIntervals(timeHelper.FIRST_INTERVAL_TIME,timeHelper.LAST_INTERVAL_TIME), 
            intervalsTo: timeHelper.createIntervals(timeHelper.FIRST_INTERVAL_TIME+1,timeHelper.LAST_INTERVAL_TIME+1),
        });
    }

    handleBookingDateChange= (bookingDate) => this.setState({bookingDate});
    handleIntervalFromChange = (event, data) => 
        this.setState({'fromTime':data.value, intervalsTo: timeHelper.createIntervals(data.value+1,timeHelper.LAST_INTERVAL_TIME+1)});

    handleIntervalToChange = (event, data) => this.setState({'toTime':data.value});
    handleChange = (event) => this.setState({[event.target.name]:event.target.value});
    
    handleSubmit= (event) => {
        event.preventDefault();
        webservices.findAvailableRooms(timeHelper.momentToString(this.state.bookingDate), this.state.fromTime, this.state.toTime, this.state.nbPersons)
            .then((response) => this.setState({rooms: response.data}));
    }

    handleBook= (event, bookingDate, fromTime, toTime, nbPersons, roomId) => {
        event.preventDefault();
        webservices.bookRoom(bookingDate, fromTime,toTime,nbPersons, roomId)
            .then((response) =>     
                webservices.findAvailableRooms(timeHelper.momentToString(this.state.bookingDate), this.state.fromTime, this.state.toTime, this.state.nbPersons)
                    .then((response) => this.setState({rooms: response.data}))
            );
    }

    render() {
        const data = {
            bookingDate:this.state.bookingDate, 
            fromTime:this.state.fromTime,
            toTime:this.state.toTime,
            nbPersons:this.state.nbPersons
        };
        const enabled = this.state.bookingDate && this.state.fromTime && this.state.toTime && this.state.nbPersons;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Date de la réunion</label>
                        <DatePicker selected={this.state.bookingDate} onChange={this.handleBookingDateChange} dateFormat={timeHelper.DATE_FORMAT}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Heure de début</label>
                        <Select name="fromTime" onChange={this.handleIntervalFromChange} options={this.state.intervalsFrom ? this.state.intervalsFrom : []} />
                    </Form.Field>
                    <Form.Field>
                        <label>Heure de fin</label>
                        <Select name="toTime" onChange={this.handleIntervalToChange} options={this.state.intervalsTo ? this.state.intervalsTo : []} />
                    </Form.Field>
                    <Form.Field>
                        <label>Nombre de personnes</label>
                        <input name="nbPersons" onChange={this.handleChange} />
                    </Form.Field>
                    <Button disabled={!enabled} type='submit'>Rechercher une salle</Button>
                    </Form.Group>
                </Form>
                <RoomsView rooms={this.state.rooms} data={data} handleBook={this.handleBook}></RoomsView> 
            </div>
        );
    }
}

export default Book;