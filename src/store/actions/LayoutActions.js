import * as types from '../types';

export const getAppLayoutDirection = () => (
    {
        type: types.GET_APP_LAYOUT_DIRECTION
    }
);

export const setAppLayoutDirection = direction => (
    {
        type: types.SET_APP_LAYOUT_DIRECTION,
        direction
    }
);
