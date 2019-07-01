import * as types from '../types';

const INITIAL_STATE =
    {
        newsDetails: {
            url: '',
            title: '',
            description: ''
        }
    };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_NEWS_DETAILS :
            return {...state, newsDetails: action.payload};
        default :
            return state;
    }

};
