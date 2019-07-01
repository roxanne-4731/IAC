import * as types from '../types';
import {Animated} from "react-native";

const INITIAL_STATE =
    {
        location: '',
        language: '',
        qiblaDegree: 0,
        geometry: {
            type: "Point",
            coordinates: [0, 0]
        },
        scrollAmount: new Animated.Value(0),
        offsetMount: new Animated.Value(0),
        routeWatch: false,
        isMute: true
    };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.GET_LOCATION :
            return {...state, location: action.payload};
        case types.GET_LANGUAGE :
            return {...state, language: action.payload};
        case types.GET_GIBLA_SUCCESS:
            return {...state, qiblaDegree: action.payload};
        case types.GET_LOCATION_POINTS:
            return {...INITIAL_STATE, geometry: action.payload};
        case types.GET_SCROLL_AMOUNT:
            return {...state, scrollAmount: action.payload};
        case types.GET_OFFSET_MOUNT :
            return {...state, offsetMount: action.payload};
        case types.GET_ROUTE_CHANGE:
            return {...state, routeWatch: action.payload};
        case types.GET_MUTE_STATE :
            return {...state, isMute: action.payload};
        default:
            return state;
    }
};
