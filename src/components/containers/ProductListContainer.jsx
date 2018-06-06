import { connect } from 'react-redux';
import ProductList from './../presentational/product/ProductList';
import React from 'react';

class ProductListContainer extends React.Component {
    render() {
        return (
                <ProductList {...this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    products: state.productsReducer.products,
    clicks: state.productsReducer.clicks
});

export default connect(mapStateToProps)(ProductListContainer);
