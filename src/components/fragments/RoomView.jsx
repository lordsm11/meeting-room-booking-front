import React, {Component} from 'react';
import { Table, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import webservices from 'helpers/webservices';
import timeHelper from 'helpers/timeHelper';

class RoomView extends Component {

    handleSubmit= (event) => {
        event.preventDefault();
        const room = this.props.room;
        const data = this.props.data;
        const handleBook = this.props.handleBook;
        handleBook(event, timeHelper.momentToString(data.bookingDate),data.fromTime,data.toTime,data.nbPersons, room.id);
    }

    render () {
        const id = this.props.id;
        const room = this.props.room;
        
        return (
            <React.Fragment>
                <Table.Cell>{room.name}</Table.Cell>
                <Table.Cell>{room.description}</Table.Cell>
                <Table.Cell>{room.nbPersons}</Table.Cell>
                <Table.Cell>
                    <Link to={"rooms/"+room.id + "/bookings"}>Réserver cette salle</Link>
                    <Button id={room.id} onClick={this.handleSubmit} type='submit'>Réserver cette salle</Button>
                </Table.Cell>
            </React.Fragment>
        );
    }

}

export default RoomView;