import React, { Component } from 'react';
import ProductContainer from './../../containers/ProductContainer';
import productHelper from '../../../helpers/productHelper';
import { Link } from 'react-router-dom';

class ProductList extends Component {

    render() {

        const products = this.props.products.length === 0 ?
            'No products, please add products' :
            this.props.products.map((product,i) => (<li key={i}><ProductContainer id={product.id} name={product.name} description={product.description}/></li>));

        return (
            <section>
                <h2>List of products</h2>
                <ul>
                    {products}
                </ul>
                <Link to={"/products/add"}>Add a product</Link>
                <br/><br/>
                <div>Global quantity = [{productHelper.getGlobalQuantity(this.props.products)}]</div>
                <div>Global clicks = [{this.props.clicks}]</div>
            </section>
        )
    }
}

export default ProductList;
