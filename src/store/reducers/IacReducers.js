import * as types from '../types';

const INITIALS_STATE = {
    news: [],
    newsDetails: {},
    hadis: {},
    guides: [],
    guideDetails: {},
    languages: {},
    newsRes: true,
    guidRes: true,
    languagesRes: true
};

export default (state = INITIALS_STATE, action) => {
    switch (action.type) {
        case types.GET_NEWS:
            return {
                ...state,
                news: action.payload
            };
        case types.GET_NEWS_DETAILS_ID:
            return {
                ...state,
                newsDetails: action.payload
            };
        case types.GET_HADIS:
            return {
                ...state,
                hadis: action.payload
            };
        case types.GET_GUIDES:
            return {
                ...state,
                guides: action.payload
            };
        case types.GET_GUILD_BY_ID:
            return {
                ...state,
                guideDetails: action.payload
            };
        case types.GET_LANGUAGE_KEYS:
            return {
                ...state,
                languages: action.payload
            };
        case types.GET_NEWS_RESPONSE:
            return {
                ...state,
                newsRes: action.payload
            };
        case types.GET_GUIEDES_RESPONSE:
            return {
                ...state,
                guidRes: action.payload
            };
        case types.GET_LANGUAGES_RESPONSE:
            return {
                ...state, languagesRes: action.payload
            };
        default:
            return state;
    }
}
