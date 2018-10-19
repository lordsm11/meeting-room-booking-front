import React, {Component} from 'react';

import 'semantic-ui-css/semantic.min.css';

import { Message } from 'semantic-ui-react'

class MessageView extends Component {

    render () {
        const header = this.props.header;
        const content = this.props.content;
        if(this.props.error) {
            return (
                <Message negative>
                    <Message.Header>{header}</Message.Header>
                    <p>{content}</p>
                </Message>
            );
        } else {
            return (
                <Message success>
                    <Message.Header>{header}</Message.Header>
                    <p>{content}</p>
                </Message>
            );
        }
    }

}

export default MessageView;