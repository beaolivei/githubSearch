import Redux from 'redux';

let stateModel = {
    username: '',
    userprofile: {},
    error: {},
    repos: []
}
const reducer = (state = stateModel, action) => {
    switch (action.type) {
        case 'UPDATE_USERNAME':
            return {
                ...state,
                username: action.username
            }
            break;
        case 'UPDATE_USER':
            return {
                ...state,
                userprofile: action.userprofile,
            }
            break;
        case 'SHOW_ERROR':
            return {
                ...state,
                error: action.error,
                }
            break;
        case 'UPDATE_REPOS':
            return {
                ...state,
                repos: action.repos
            }
        default:
            return state;
    }
}

export default reducer