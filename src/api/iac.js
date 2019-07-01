import * as urls from '../helper/api-urls';
import http from '../services/http.service';
import * as functions from '../helper/functions';

export default {
    getNews(query) {
        return new Promise((resolve, reject) => {
            http.get(`${urls.NEWS_GET}?${query}`).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            })
        })
    },
    getNewsByID(news) {
        return new Promise((resolve, reject) => {
            http.get(`${urls.NEWS_GET}?id=${news}`).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    getHadis() {
        return new Promise((resolve, reject) => {
            http.get(urls.HADIS_GET).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    getGuides() {
        return new Promise((resolve, reject) => {
            http.get(urls.GUIDE_GET).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    },
    getGuidesById(detail) {
        return new Promise((resolve, reject) => {
            http.get(`${urls.GUIDE_GET}?id=${detail}`).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        })
    },
    language() {
        return new Promise((resolve, reject) => {
            http.get(urls.LANGUAGE).then((res) => {
                let expireDate = new Date();
                expireDate.setHours(expireDate.getHours() + 4);
                const languages = {
                    expireDate: expireDate,
                    lan: res.data
                };
                functions.setItem('@LANGUAGE', JSON.stringify(languages));
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
            // functions.retrieveData('@LANGUAGE').then((res) => {
            //     const lan = JSON.parse(res).lan;
            //     resolve(lan);
            // }).catch(() => {
            //     http.get(urls.LANGUAGE).then((res) => {
            //         let expireDate = new Date();
            //         expireDate.setHours(expireDate.getHours() + 4);
            //         const languages = {
            //             expireDate: expireDate,
            //             lan: res.data
            //         };
            //         functions.setItem('@LANGUAGE', JSON.stringify(languages));
            //         resolve(res.data);
            //     }).catch((err) => {
            //         reject(err);
            //     })
            // })

        })
    }
}

