import React, { Component } from 'react';
import productHelper from '../../../helpers/productHelper';
import action from '../../../helpers/actions';
import { Link } from 'react-router-dom';

class Product extends Component {

    render() {
        const id = this.props.id;
        const product = productHelper.findProduct(id)[0];
        const nameMessage = this.props.intl.formatMessage({ id: 'MASMI.DEMO.NAME' });
        return (
            <section>
                <button onClick={action.toggleDescription(id)}>Details</button>
                <Link to={"/products/"+id} key={id}>{nameMessage} {product.name}</Link>
                {product.showDescription ? ' ['+product.description+'] ' : ''}
                <span> : [Q={productHelper.getQuantity(id)}]   </span>
                <button onClick={action.addQuantity(id)}>+</button>
                <button onClick={action.removeQuantity(id)}>-</button>
                <button onClick={action.removeProduct(id)}>Remove</button>
            </section>
        )
    }
}

export default Product;
