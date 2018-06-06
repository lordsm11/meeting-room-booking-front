import React, { Component } from 'react';
import Moment from 'moment';

import { Field } from 'redux-form';
import validatorHelper from '../../../helpers/validatorHelper';
import footHelper from '../../../helpers/footHelper';
import {connect} from "react-redux";


class Match extends Component {

    render() {
        const name = this.props.name;
        const match = footHelper.findMatch(this.props.matchs, name);
        const fieldName = "result_"+ name;

        return (
            <tr key={match.id}>
                <td>{match.firstTeam}</td>
                <td>{match.secondTeam}</td>
                <td>{Moment(match.startDate).format('DD/MM/YYYY')}</td>
                <td>{match.result ? match.result : 'Not started'}</td>
                <td><Field name={fieldName} type="text" component={validatorHelper.renderSimpleField} label="Result"/></td>
            </tr>
        );

    }
}


export default connect(state => ({matchs: state.footReducer.matchs}), {})(Match);