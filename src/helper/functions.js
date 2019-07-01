import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment-jalaali';
import * as config from '../config/config';
import AllImages from '../assets/img/allImages';
import {styles} from './imageStyles';

export function radians(degrees) {
    return degrees * Math.PI / 180;
}

export function degrees(radians) {
    return radians * 180 / Math.PI;
}

export async function setItem(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log('error in setItem => ', error);
    }
}

export async function retrieveData(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log('error in retrieveData => ', error);
    }
}

export async function removeItem(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log('error in removeItem => ', error);
    }
}

export async function mergeItem(key, value) {
    try {
        await AsyncStorage.mergeItem(key, value);
    } catch (error) {
        console.log('error in margeItem => ', error);
    }
}

export function isObjEmpty(obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            if (Array.isArray(obj[key]) && obj[key].length) {
                return false;
            } else if (!isObjEmpty(obj[key])) {
                return false;
            }
        } else {
            if (obj[key]) {
                return false;
            }
        }
    }
    return true;
}

export function miladiToShamsi(string) {
    return moment(string, 'D-M-YYYY').format('jYYYY/jM/jD');
}

export function findPrayerTime(array) {
    let prayerTime;
    loop1:
        for (let j = 0; j < array.length; j++) {
            let item = array[j];
            let date = new Date(Number(item.date.timestamp * 1000));
            for (let i = 0; i < Object.entries(item.timings).length; i++) {
                let time = Object.entries(item.timings)[i];
                let timeToSound = time[1];
                let timeToSoundArray = timeToSound.split(':');
                date.setHours(timeToSoundArray[0]);
                date.setMinutes(timeToSoundArray[1].slice(0, 3));
                if (date > new Date() && time[0] !== 'Sunrise' && time[0] !== 'Midnight' && time[0] !== 'Sunset') {
                    prayerTime = timeToSound.slice(0, 5);
                    break loop1;
                }
            }
        }
    if (prayerTime) {
        return prayerTime;
    }
    return '-';
}

export function getImage(id, style = 'cube') {
    let which = styles[style];
    if (id != null) {
        return `${config.IAC_BASE_URL}${which}/${id}`;
    } else {
        return AllImages.logo;
    }
}