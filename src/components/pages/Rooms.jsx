import React, {Component} from 'react';
import bookingApi from 'api/bookingApi';

import 'semantic-ui-css/semantic.min.css';

import RoomsView from 'components/fragments/RoomsView';
import timeHelper from 'helpers/timeHelper';

class Rooms extends Component {

    componentWillMount() {
        this.setState({
            bookingDate: timeHelper.getMoment()
        });
        bookingApi.getRooms()
        .then((response) => {
            this.setState({rooms: response.data});
        });
    }

    render () {
        return (
            <RoomsView rooms={this.state.rooms}></RoomsView> 
        );
    }

}

export default Rooms;