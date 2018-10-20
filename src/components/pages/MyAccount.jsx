import React, {Component} from 'react';
import { connect } from 'react-redux';
import bookingApi from 'api/bookingApi';

import { Table } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import BookingView from 'components/fragments/BookingView'

class MyAccount extends Component {

    componentWillMount() {
        bookingApi.findBookings(this.props.email)
        .then((response) => {
            this.setState({bookings: response.data});
        });
    }

    handleDeleteBooking= (bookingId) => {
        bookingApi.deleteBooking(bookingId)
        .then((response) => {
            bookingApi.findBookings(this.props.email)
            .then((response) => {
                this.setState({bookings: response.data});
            });
            });
    }

    renderBookings () {

        if(!this.state || !this.state.bookings || this.state.bookings.length === 0) {
            return (<h3>Aucune réservation</h3>);
        }

        const bookings = this.state.bookings;
     
        const bookingsView = bookings.map((booking, id) => (<Table.Row key={id}><BookingView booking={booking} handleDeleteBooking={this.handleDeleteBooking}></BookingView></Table.Row>));

        return (
                <div>
                <h3>Liste des réservations :</h3>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Réservation</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {bookingsView}
                    </Table.Body>
                </Table>
                </div>
        );
    }
 
    render() {
        return (
            <div>
                <div className="ui message">
                    <div className="header">Mon compte</div>
                    <ul className="list">
                        <li>Email : {this.props.email}</li>
                    </ul>
                </div>
                {this.renderBookings()}
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        email: store.loginReducer.email
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
