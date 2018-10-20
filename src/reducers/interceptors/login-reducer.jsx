export default (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_ACTION':
            return {
                ...state, 
                actionlogin: true,
                email: action.email  
            };
        case 'LOGIN_ACTION_SUCCESS':
            return {
                ...state, 
                connected: true ,
                actionlogin: false
        };
        case 'LOGIN_ACTION_ERROR':
            return {
                ...state, 
                connected: false , 
                actionlogin: false, 
                email: undefined  
            };
        case 'LOGOUT_ACTION':
            return {
                ...state, 
                connected: false,
                email: undefined  
            };
        default:
            return state;
    }
};
