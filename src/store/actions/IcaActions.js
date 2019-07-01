import * as types from '../types';
import api from '../../api/iac';
import * as functions from '../../helper/functions';


export const getNews = (query = '') => {
    return (dispatch) => {
        getNewsResponse(dispatch, true);
        api.getNews(query).then((res) => {
            getNewsResponse(dispatch, false);
            news(dispatch, res);
        }).catch((error) => {
            alert('No NET');
            getNewsResponse(dispatch, false);
            console.log('error in getNews :::: ', error);
        })
    }
};

export const getNewsById = (news) => {
    return (dispatch) => {
        api.getNewsByID(news).then((res) => {
            newsDetails(dispatch, res)
        }).catch((err) => {
            console.log('error in getNewsById ::: ', err);
        })
    }
};

export const getGuides = () => {
    return (dispatch) => {
        getGuidesResponse(dispatch, true);
        api.getGuides().then((res) => {
            getGuidesResponse(dispatch, false);
            guides(dispatch, res);
        }).catch((error) => {
            getGuidesResponse(dispatch, false);
            console.log('error in getGuides :::: ', error);
        })
    }
};
export const language = () => {
    return (dispatch) => {
        getLanguagesResponse(dispatch, true);
        api.language().then((res) => {
            getLanguagesResponse(dispatch, false);
            getLanguage(dispatch, res);
        }).catch((error) => {
            getLanguagesResponse(dispatch, false);
            console.log('error in getGuides :::: ', error);
        })
    }
};
export const getGuidesByID = (guide) => {
    return (dispatch) => {
        api.getGuidesById(guide).then((res) => {
            guideDetails(dispatch, res)
        }).catch((err) => {
            console.log('error in getGuidesByID ::: ', err);
        })
    }
};

export const getHadis = () => {
    return (dispatch) => {
        api.getHadis().then((res) => {
            hadisContent(dispatch, res);
        }).catch(() => {
            console.log('getting error in get hadis ::: ', res);
        });
    }
};

const news = (dispatch, news) => {
    dispatch({
        type: types.GET_NEWS,
        payload: news
    });
};

const newsDetails = (dispatch, news) => {
    dispatch({
        type: types.GET_NEWS_DETAILS_ID,
        payload: news
    });
};

const hadisContent = (dispatch, payload) => {
    dispatch({
        type: types.GET_HADIS,
        payload: payload
    })
};

const guides = (dispatch, payload) => {
    dispatch(
        {
            type: types.GET_GUIDES,
            payload: payload
        }
    )
};
const guideDetails = (dispatch, payload) => {
    dispatch(
        {
            type: types.GET_GUILD_BY_ID,
            payload: payload
        }
    )
};
const getLanguage = (dispatch, payload) => {
    dispatch(
        {
            type: types.GET_LANGUAGE_KEYS,
            payload: payload
        }
    )
};
const getNewsResponse = (dispatch, payload) => {
    dispatch(
        {
            type: types.GET_NEWS_RESPONSE,
            payload: payload
        }
    )
};
const getGuidesResponse = (dispatch, payload) => {
    dispatch(
        {
            type: types.GET_GUIEDES_RESPONSE,
            payload: payload
        }
    )
};
const getLanguagesResponse = (dispatch, payload) => {
    dispatch(
        {
            type: types.GET_LANGUAGES_RESPONSE,
            payload: payload
        }
    )
};