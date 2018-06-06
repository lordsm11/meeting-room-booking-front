import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import actions from '../../../helpers/actions';
import { Link } from 'react-router-dom';
import validatorHelper from '../../../helpers/validatorHelper';
import 'semantic-ui-css/semantic.min.css';
import { Form } from 'semantic-ui-react'

class AddProductForm extends Component {
    render() {
        const { error, handleSubmit} = this.props;
        return (

            <Form onSubmit={handleSubmit}>
                <Form.Group widths='equal'>
                    {error && <strong>{error}</strong>}
                    <Form.Field>
                        <Field name="id" type="text" component={validatorHelper.renderField} validate={[validatorHelper.required, validatorHelper.number]} label="Id" />
                    </Form.Field>
                    <Form.Field>
                        <Field name="name" type="text" component={validatorHelper.renderField} validate={[validatorHelper.required, validatorHelper.maxLength15]} label="Name" />
                    </Form.Field>
                    <Form.Field>
                        <Field name="description" type="text" component={validatorHelper.renderField} validate={[validatorHelper.required]} label="Description"/>
                    </Form.Field>
                </Form.Group>
                <Form.Button>Add product</Form.Button>
                <div><Link to={"/products"}>Return</Link></div>
            </Form>

        );
    }
}




const onSubmit = (values, dispatch) => {
    dispatch(actions.addProduct());
};

export default reduxForm({
    form: 'addProductForm',
    onSubmit
})(AddProductForm);


