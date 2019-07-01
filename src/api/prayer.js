import prayer from '../services/prayer.service';
import * as urls from '../helper/api-urls';

export default {
    getCalender(property) {
        return new Promise((resolve, reject) => {
            prayer.get(`${urls.CALENDER}?latitude=${property.lat}&longitude=${property.lng}&month=${property.month}&method=${property.method}&year=${property.year}`)
                .then((response) => {
                    resolve(response.data.data);
                }).catch((error) => {
                reject(error);
            })
        })
    }
}
