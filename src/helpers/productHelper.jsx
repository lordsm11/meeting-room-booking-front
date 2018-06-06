import store from "../redux/store";

function getProducts() {
    return store.getState().productsReducer.products;
}

function findProduct(index) {
    return getProducts().filter((p) => p.id === index);
}

function isIdExist(index) {
    return findProduct(index).length > 0;
}

function getGlobalQuantity(products) {
    return products.map((a) => (a.quantity)).reduce((a, b) => (a + b), 0);
}

function getQuantity(id) {
    let product = findProduct(id);
    return product.length > 0 ? product[0].quantity : 0;
}

function addProduct(state, product) {
    let id = Number(product.id);
    let name = product.name;
    let description = product.description;
    let showDescription = product.showDescription;
    let quantity = 0;
    let newProducts = getProducts().slice();
    newProducts.splice(id, 0, {id, name, description, showDescription, quantity});
    return {...state, products: newProducts };
}


function removeProduct(state, index) {
    let position = getProducts().findIndex((p) => p.id === index);
    let newClicks = state.clicks + 1;
    return {
        products: [
            ...state.products.slice(0, position),
            ...state.products.slice(position + 1)
        ],
        clicks: newClicks
    };
}

function updateQuantity(state, id, threshold) {
    let product = findProduct(id);
    let newQuantity = product[0].quantity + threshold;
    let newClicks = state.clicks + 1;
    if(newQuantity < 0) {
        return {...state, clicks: newClicks };
    }
    let newProducts = state.products.map((item, index) => {
        if (item.id !== id) {
            return item;
        }
        return {...item, quantity: item.quantity + threshold };
    });

    return { products: newProducts, clicks: newClicks};

}

function toggleDescription(state, id) {
    let newClicks = state.clicks + 1;
    let newState = state.products.map((item, index) => {
        if (item.id !== id) {
            return item;
        }
        return {...item, showDescription: !item.showDescription };
    });

    return { products: newState, clicks: newClicks};

}

export default {
    findProduct,
    getGlobalQuantity,
    getQuantity,
    updateQuantity,
    addProduct,
    removeProduct,
    toggleDescription,
    isIdExist
}