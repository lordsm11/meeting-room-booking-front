import React, {Component} from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Message } from 'semantic-ui-react'

class MessageView extends Component {

    render () {
        const content = this.props.content;
        if(this.props.error) {
            return (
                <Message negative>
                    <Message.Header>Une erreur est survenue!</Message.Header>
                    <p>{content}</p>
                </Message>
            );
        } else {
            return (
                <Message success>
                    <Message.Header>Action réussite!</Message.Header>
                    <p>{content}</p>
                </Message>
            );
        }
    }

}

export default MessageView;