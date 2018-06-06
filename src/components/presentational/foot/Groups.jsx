import React, { Component } from 'react';
import footService from '../../../helpers/footService';
import actions from '../../../helpers/actions';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";

class Groups extends Component {

    componentWillMount() {
        footService.getGroups()
                .then(function(response){
                    actions.setGroups(response.data);
                });
    }

    render() {
        const groups = this.props.groups;
        const groupsView = groups ? groups.map((group, id) => (
            <div key={id}>
                <Link to={"/groups/"+group.id}>{group.name}</Link>
            </div>
        )) : '';
        return (
            <section>
                {groupsView}
            </section>
        );
    }
}

export default connect(state => ({groups: state.footReducer.groups}), {})(Groups);
