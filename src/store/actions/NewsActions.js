import * as types from '../types';

export const getNewsDetails = (details) => {
    return {
        type: types.GET_NEWS_DETAILS,
        payload: details
    }
};

