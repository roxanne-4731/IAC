import * as types from '../types';

const Day = new Date().getDate();

const INITIAL_STATE = {
    weeksPrayers: [],
    todayPrayer: {},
    dateNow: 0,
    gotResponse: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_PRAYER_TIME_CALENDER:
            const calender = action.payload;
            const times = calender.filter(value => value.date.gregorian.day >= Day);
            return {...state, weeksPrayers: times};
        case types.GET_PRAYER_TIME_TODAY :
            const days = action.payload;
            const today = days.filter(value => value.date.gregorian.day == Day);
            return {...state, todayPrayer: today[0]};
        case types.GET_DATE_NOW:
            return {...state, dateNow: action.payload};
        case types.GET_PRAYER_CALENDER_RESPONSE:
            return {...state, gotResponse: action.payload};
        default :
            return state;
    }
};
