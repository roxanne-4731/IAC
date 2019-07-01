import axios from 'axios';
import config from '../config/config';

let prayer;

class PrayerService {

    constructor() {
        prayer = axios.create({
            baseURL: config.BASE_URL_PRAYER_TIME,
            timeout: 6000,
        });
    }

    get(url, config, error = true) {
        return prayer.get(url, config);
    }

    post(url, data, config, error = true) {
        config = config || {headers: {'content-type': 'application/json'}};
        return prayer.post(url, data, config);
    }
}

export default new PrayerService();
