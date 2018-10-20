function login(email) {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGIN_ACTION',
            email: email
        });
    }
}

function loginOk() {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGIN_ACTION_SUCCESS',
        });
    }
}

function loginKo() {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGIN_ACTION_ERROR'
        });
    }
}

function logout() {
    return (dispatch, getState) => {
        dispatch({
            type: 'LOGOUT_ACTION'
        });
    }
}

export default
{
    login,
    loginOk,
    loginKo,
    logout
}