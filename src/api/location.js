import map from '../services/mapbox.service';
import config from '../config/config';
import * as urls from '../helper/api-urls';
import axios from 'axios';

export default {
    getPoints(location, limit = 5) {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.mapbox.com${urls.GEOCODING}/${location}.json?autocomplete=true&language=en&access_token=${config.MAPBOX_ACCESS_TOKEN}&limit=${limit}`)
                .then((response) => {
                resolve(response.data.features);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    getLocationBycoords(lng, lat) {
        return new Promise((resolve, reject) => {
            axios.get(`https://api.mapbox.com${urls.GEOCODING}/${lng},${lat}.json?autocomplete=true&limit=1&language=en&access_token=${config.MAPBOX_ACCESS_TOKEN}`).then(
                (response) => {
                    resolve(response)
                }
            ).catch((err) => {
                reject(err)
            });
        })
    }
}
