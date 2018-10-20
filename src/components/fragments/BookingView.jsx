import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import stringUtils from 'helpers/stringUtils';
import DeleteBookingModal from 'components/modal/DeleteBookingModal';

class BookingView extends Component {

    renderDeleteBooking(booking) {
        if(booking.active) {
            return (<DeleteBookingModal bookingId={booking.bookingId} handleDeleteBooking={this.props.handleDeleteBooking}></DeleteBookingModal>);
        }
        return null;
    }

    render () {
        const booking = this.props.booking;
        return (
            <React.Fragment>
                <Table.Cell>{stringUtils.formatAccountBooking(booking)}</Table.Cell>
                <Table.Cell>{booking.active ? 'active' : 'annulé'}</Table.Cell>
                <Table.Cell>{this.renderDeleteBooking(booking)}</Table.Cell>
            </React.Fragment>
        );
    }


}

export default BookingView;