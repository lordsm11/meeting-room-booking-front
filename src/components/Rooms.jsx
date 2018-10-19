import React, {Component} from 'react';
import webservices from 'helpers/webservices';

import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import RoomsView from 'components/fragments/RoomsView';
import timeHelper from 'helpers/timeHelper';

class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookingDate: timeHelper.getMoment()
        };
    }

    componentWillMount() {
        var self = this;
        webservices.getRooms()
                .then(function (response) {
                    self.setState({...self.state, rooms: response.data});
                });
    }

    render () {
        return (
            <RoomsView rooms={this.state.rooms}></RoomsView> 
        );
    }

}

export default Rooms;