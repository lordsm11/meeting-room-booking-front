import React, {Component} from 'react';
import webservices from 'helpers/webservices';
import timeHelper from 'helpers/timeHelper';
import { Button, Form, Select } from 'semantic-ui-react'

import DatePicker from 'react-datepicker';

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import RoomsView from 'components/fragments/RoomsView';
import MessageView from 'components/fragments/MessageView';


class Book extends Component {

    componentWillMount() {
        this.setState({
            intervalsFrom: timeHelper.createIntervals(timeHelper.FIRST_INTERVAL_TIME,timeHelper.LAST_INTERVAL_TIME), 
            intervalsTo: timeHelper.createIntervals(timeHelper.FIRST_INTERVAL_TIME+1,timeHelper.LAST_INTERVAL_TIME+1),
            bookingDate: timeHelper.getMoment()
        });
    }

    handleBookingDateChange= (bookingDate) => {
        this.setState({bookingDate});
    }

    handleIntervalFromChange = (event, data) =>  { 
        this.setState({'fromTime':data.value, intervalsTo: timeHelper.createIntervals(data.value+1,timeHelper.LAST_INTERVAL_TIME+1)});
    }

    handleIntervalToChange = (event, data) => {
        this.setState({'toTime':data.value});
    }
    
    handleNbPersonsChange = (event) => { 
        this.setState({'nbPersons':event.target.value});
    }
    
    handleSearch= (event) => {
        event.preventDefault();
        webservices.findAvailableRooms(timeHelper.momentToString(this.state.bookingDate), this.state.fromTime, this.state.toTime, this.state.nbPersons)
            .then((response) => this.setState({rooms: response.data, validBooking:undefined, errorBooking:undefined, messageValidBooking:undefined}));
    }

    handleBook= (event, bookingDate, fromTime, toTime, nbPersons, roomId, roomName) => {
        event.preventDefault();
        webservices.bookRoom(bookingDate, fromTime,toTime,nbPersons, roomId)
            .then((response) => { 
                if(response.status === 204) {
                    const messageValidBooking = "Salle " + roomName + " réservée le " 
                        + bookingDate + " de " 
                        + timeHelper.formatTime(fromTime) + " à " + timeHelper.formatTime(toTime) 
                        + " pour " + nbPersons + " personnes";

                    this.setState({validBooking: true, messageValidBooking});
                    webservices.findAvailableRooms(timeHelper.momentToString(this.state.bookingDate), this.state.fromTime, this.state.toTime, this.state.nbPersons)
                        .then((response) => this.setState({rooms: response.data}))
                } else {
                    this.setState({errorBooking: true});
                }
            });
    }

    renderSuccessMessage(content) {
        return (
           <MessageView 
                header="La salle a été réservée avec succés" 
                content={content}>
            </MessageView>
        );
    }

    renderErrorMessage() {
        return (
            <MessageView 
                error="true" 
                header="La salle n'a pas été réservée" 
                content="Une erreur est survenue">
            </MessageView>
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

        let blocResult;
        if(this.state.errorBooking) {
            blocResult = this.renderErrorMessage();
        } else if(this.state.validBooking) {
            blocResult = this.renderSuccessMessage(this.state.messageValidBooking);
        }

        return (
            <div>
                <Form onSubmit={this.handleSearch}>
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
                        <input name="nbPersons" onChange={this.handleNbPersonsChange} />
                    </Form.Field>
                    <Button disabled={!enabled} type='submit'>Rechercher une salle</Button>
                    </Form.Group>
                </Form>
                {blocResult}
                <RoomsView rooms={this.state.rooms} data={data} handleBook={this.handleBook}></RoomsView> 
            </div>
        );
    }
}

export default Book;