import { connect } from 'react-redux';
import Product from 'components/product/Product';
import React from 'react';
import { injectIntl } from 'react-intl';

class ProductContainer extends React.Component {
    render() {
        return (
             <Product {...this.props}/>
        )
    }
}

const mapStateToProps = state => ({
    products: state.productsReducer.products
});

export default injectIntl(connect(mapStateToProps)(ProductContainer));