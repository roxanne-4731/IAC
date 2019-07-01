import axios from 'axios';
import config from '../config/config';

class Mapbox {
    constructor() {
        axios.defaults.baseURL = config.BASE_URL_MAPBOX;
    }
    get(url, config, error = true) {
        return axios.get(url, config);
    }

    post(url, data, config, error = true) {
        config = config || { headers: { 'content-type': 'application/json' }};
        return axios.post(url, data, config);
    }
}

export default new Mapbox();
