import React, {Component} from 'react';
import { Table } from 'semantic-ui-react'
import RoomView from 'components/fragments/RoomView'

import 'semantic-ui-css/semantic.min.css';

class RoomsView extends Component {

    render () {
        const rooms = this.props.rooms;
        const data = this.props.data;
        const handleBook = this.props.handleBook;
        if(!rooms || rooms.length === 0) {
            return (<h3>Aucune salle disponible</h3>);
        }

        const roomsView = rooms.map((room, id) => (<Table.Row key={id}><RoomView room={room} data={data} handleBook={handleBook}></RoomView></Table.Row>));

        return (
                <div>
                <h3>{rooms.length} Salles de réunions trouvées</h3>
                <Table striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nom</Table.HeaderCell>
                            <Table.HeaderCell>Decription</Table.HeaderCell>
                            <Table.HeaderCell>Capacité</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {roomsView}
                    </Table.Body>
                </Table>
                </div>
        );
    }

}

export default RoomsView;