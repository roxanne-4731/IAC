import api from '../../api/prayer';
import * as types from '../types';

export const getCalender = (obj) => {
    return (dispatch) => {
        getPrayerCalenderResponse(dispatch, false);
        api.getCalender(obj).then((res) => {
            getPrayerCalenderResponse(dispatch, true);
            getPrayerTimeCalender(dispatch, res);
            getPrayerTimeToday(dispatch, res);
        }).catch((err) => {
            getPrayerCalenderResponse(dispatch, true);
            getPrayerTimeCalender(dispatch, []);
            getPrayerTimeToday(dispatch, []);
            console.log('error in getCalender Action => ', err);
        });
    }
};
export const getDateNow = (date) => {
    return {
        type: types.GET_DATE_NOW,
        payload: date
    }
};

const getPrayerTimeCalender = (dispatch, property) => {
    dispatch(
        {
            type: types.GET_PRAYER_TIME_CALENDER,
            payload: property
        }
    )
};

const getPrayerTimeToday = (dispatch, property) => {
    dispatch(
        {
            type: types.GET_PRAYER_TIME_TODAY,
            payload: property
        }
    )
};

const getPrayerCalenderResponse = (dispatch, hasResponse) => {
    dispatch(
        {
            type: types.GET_PRAYER_CALENDER_RESPONSE,
            payload: hasResponse
        }
    )
};

