import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class DeleteBookingModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false })
  confirm = (e) => {
    const handleDeleteBooking = this.props.handleDeleteBooking;
    handleDeleteBooking(this.props.bookingId);
    this.setState({ open: false })
}

render() {
    const inlineStyle = {
      modal : {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    };

    return (
      <div>
         <Button onClick={this.open}>Supprimer</Button>
        <Confirm
          cancelButton='Annuler'
          confirmButton='Supprimer'
          content='Voulez vous supprimer cette réservation ?'
          open={this.state.open} 
          onCancel={this.close} 
          onConfirm={this.confirm} 
          style={inlineStyle.modal}  
        />
      </div>
    )
  }
}

export default DeleteBookingModal;