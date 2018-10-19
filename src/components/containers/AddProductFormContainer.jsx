import { connect } from 'react-redux';
import AddProductForm from 'components/forms/AddProductForm';
import action from 'helpers/actions';
import React from 'react';

class AddProductFormContainer extends React.Component {
    render() {
        return (
                <AddProductForm {...this.props}/>
        )
    }
}

export default connect(
        state => ({
            state: state
        }),
        {
            addProduct: action.addProduct
        }
)(AddProductFormContainer);
