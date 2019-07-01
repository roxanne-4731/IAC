import axios from 'axios';
import config from '../config/config';
import * as functions from '../helper/functions';

let instance;
const LANGUAGES = {
    'SE': 'sv',
    'IR': 'fa',
    'SA': 'ar'
};

class HttpService {
    constructor() {
        instance = axios.create();
        instance.defaults.baseURL = config.IAC_BASE_URL;
        // instance.defaults.timeout = 6000;
        functions.retrieveData("@LOCATION_INFO").then((res) => {
            instance.interceptors.request.use(
                (config) => {
                    let language = JSON.parse(res).language;
                    if (language) {
                        config.headers['langcode'] = LANGUAGES[language];
                    }

                    return config;
                }, (error) => {
                    return Promise.reject(error);
                });

            instance.interceptors.response.use(
                (response) => response,
                (error) => {
                    return Promise.reject(error);
                }
            );
        });
    }

    get(url, config) {
        return instance.get(url, config);
    }

    post(url, data, config) {
        return instance.post(url, data, config);
    }
}

export default new HttpService();