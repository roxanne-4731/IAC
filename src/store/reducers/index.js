import {combineReducers} from 'redux';
import AppReducer from './AppReducer';
import LayoutReducer from './LayoutReducers';
import NewsReducers from './NewsReducers';
import PrayerReducer from './PrayerReducer';
import IacReducers from './IacReducers';

export default combineReducers(
    {
        app: AppReducer,
        layout: LayoutReducer,
        news: NewsReducers,
        prayer: PrayerReducer,
        iac: IacReducers
    }
);
