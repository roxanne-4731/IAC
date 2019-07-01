import * as types from '../types';

const INITIALS_STATE = {
    layoutDirection: false
};
export default (state = INITIALS_STATE, action) => {
    switch (action.type) {
        case types.GET_APP_LAYOUT_DIRECTION:
            return {
                ... state
            };
        case types.SET_APP_LAYOUT_DIRECTION:
            return {
                ...state,
                layoutDirection: !action.direction
            };
        default:
            return state;
    }
}
