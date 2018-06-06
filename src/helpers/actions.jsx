import store from "../redux/store";
import { SubmissionError } from 'redux-form'
import productHelper from './productHelper';

function addProduct() {
    return (dispatch, getState) => {
        const values = getState().form.addProductForm.values;
        if (productHelper.isIdExist(Number(values.id))) {
            throw new SubmissionError({
                id: 'please correct id!',
                _error: 'Id already exist!'
            })
        }
        const product = {
            id: values.id,
            name: values.name,
            description: values.description,
            showDescription: true
        };
        values.id = '';
        values.name = '';
        values.description = '';

        dispatch({
            type: 'ADD_PRODUCT',
            product,
        });
    }
}

function editScore() {
    return (dispatch, getState) => {
        const values = getState().form.editScoreForm.values;
        const results = [];
        for (let key in values) {
            results.push({
                name:key.substr(7),
                result:values[key]
            });
        }
        dispatch({
            type: 'EDIT_SCORE',
            results:results
        });
    }
}


function removeProduct(id) {
    return () => store.dispatch({
        type: 'REMOVE_PRODUCT',
        index: id
    });
}

function addQuantity(id) {
    return () => store.dispatch({
        type: 'ADD_QUANTITY',
        index: id
    });
}

function removeQuantity(id) {
    return () => store.dispatch({
        type: 'REMOVE_QUANTITY',
        index: id
    });
}

function toggleDescription(id) {
    return () => store.dispatch({
        type: 'TOGGLE_DESCRIPTION',
        index: id
    });
}

function updateMatchs(matchs) {
    store.dispatch({
        type: 'UPDATE_MATCHS',
        matchs: matchs
    });
}

function setTeams(teams) {
    store.dispatch({
        type: 'SET_TEAMS',
        teams: teams
    });
}

function setGroups(groups) {
    store.dispatch({
        type: 'SET_GROUPS',
        groups: groups
    });
}


export default
{
    addQuantity,
    removeQuantity,
    addProduct,
    removeProduct,
    toggleDescription,
    editScore,
    updateMatchs,
    setTeams,
    setGroups
}