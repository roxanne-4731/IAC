import * as types from '../types';
import * as functions from '../../helper/functions';
import api from '../../api/location';

export const getLocation = (location) => {
    return {
        type: types.GET_LOCATION,
        payload: location
    };
};

export const getLanguage = (language) => {
    return {
        type: types.GET_LANGUAGE,
        payload: language
    }
};

export const getQiblaDegree = ({lat, lng}) => {
    return (dispatch) => {
        const kaabaLocation = {
            lat: 21.4225,
            lng: 39.8262
        };
        let lat_1 = functions.radians(lat);
        let lng_1 = functions.radians(lng);

        let lat_2 = functions.radians(kaabaLocation.lat);
        let lng_2 = functions.radians(kaabaLocation.lng);

        const qiblaDegree = functions.degrees(
            Math.atan2(
                Math.sin(lng_2 - lng_1),
                (Math.cos(lat_1) * Math.tan(lat_2) - Math.sin(lat_1) * Math.cos(lng_2 - lng_1))
            )
        );
        getQiblaSuccess(dispatch, qiblaDegree.toFixed(2));
    }
};

export const getLocations = (location, limit) => {
    console.log(limit);
    return (dispatch) => {
        return api.getPoints(location, limit);
    }
};

export const getScrollAmount = (amount) => {
    return {
        type: types.GET_SCROLL_AMOUNT,
        payload: amount
    }
};

export const getOffsetAnim = (amount) => {
    return {
        type: types.GET_OFFSET_MOUNT,
        payload: amount
    }
};

export const getRouteChanging = (watch) => {
    return {
        type: types.GET_ROUTE_CHANGE,
        payload: watch
    }
};
export const getMuteState = (isMute) => {
    return {
        type: types.GET_MUTE_STATE,
        payload: isMute
    }
};

const getQiblaSuccess = (dispatch, qiblaDegree) => {
    dispatch({
        type: types.GET_GIBLA_SUCCESS,
        payload: qiblaDegree
    });
};

const getPoints = (dispatch, locaionPoints) => {
    dispatch({
        type: types.GET_LOCATION_POINTS,
        payload: locaionPoints
    });
};
