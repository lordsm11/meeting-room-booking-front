import productHelper from '../../helpers/productHelper';

const initState = {clicks: 0, products: []};

export default (state = initState, action) => {
    switch (action.type) {
        case 'ADD_QUANTITY':
            return productHelper.updateQuantity(state, action.index, 1);
        case 'REMOVE_QUANTITY':
            return productHelper.updateQuantity(state, action.index, -1);
        case 'TOGGLE_DESCRIPTION':
            return productHelper.toggleDescription(state, action.index);
        case 'ADD_PRODUCT':
            return productHelper.addProduct(state, action.product);
        case 'REMOVE_PRODUCT':
            return productHelper.removeProduct(state, action.index);
        default:
            return state;
    }
};

