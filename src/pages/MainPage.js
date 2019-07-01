import React, {Component} from 'react';
import {AppState, Linking, DeviceEventEmitter} from 'react-native';
import MainLayout from '../layout/MainLayout';
import ScrollableHeader from '../components/ScrollView';
import {connect} from 'react-redux';
import PushNotification from "react-native-push-notification";
import Notification from '../components/pushNotif';
import {Message} from '../helper/notificationMessage';
import {getNews, getNewsDetails, getNewsById, getHadis} from '../store/actions';

class MainPage extends Component {
    _isMount = false;
    state = {
        backClickCount: 0,
        isLogin: false,
        pause: false
    };

    componentWillMount() {
        this._isMount = true;
        if (this._isMount) {
            this.props.getHadis();
        }
    }

    componentDidMount() {
        this._isMount = true;
        if (this._isMount) {
            AppState.addEventListener('change', this.handleAppStateChange.bind(this));
        }
    }

    componentWillUnmount() {
        this._isMount = false;
        if (!this._isMount) {
            AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.routeWatch !== nextProps.routeWatch && nextProps.routeWatch === true) {
            this.props.getNews('offset=0&length=5');
        }
    }

    handleAppStateChange(appState) {
        if (appState === 'background' || appState === 'inactive' || appState === 'active') {
            PushNotification.cancelAllLocalNotifications();
            this.props.weeksPrayers.map((item, index) => {
                ['Imsak', 'Midnight', 'Sunrise', 'Sunset', 'Asr', 'Isha'].forEach(element => delete item.timings[element]);
            });
            // PushNotification.localNotificationSchedule({
            //     message: 'Please',
            //     date: new Date(Date.now() + (2000)),
            //     soundName: 'azan.amr'
            // });
            // console.log('hello');
            // if (new Date().getMinutes() === 31) {
            //     let url = 'example://gizmos';
            //     Linking.openURL(url).catch((err) => console.error('An error occurred', err));
            // }
            this.props.weeksPrayers.map((item, index) => {
                Object.entries(item.timings).map((time) => {
                    let timeToSound = time[1];
                    let timeToSoundArray = timeToSound.split(':');
                    let date = new Date();
                    date.setHours(timeToSoundArray[0]);
                    date.setMinutes(timeToSoundArray[1].slice(0, 3));
                    date.setDate(item.date.gregorian.day);
                    if (new Date() < date) {
                        PushNotification.localNotificationSchedule({
                            message: Message[time[0]].message,
                            date: date,
                            soundName: 'azan.amr',
                        });
                    }
                });
            });
        }
    };

    render() {
        return (
            <MainLayout>
                <Notification/>
                <ScrollableHeader/>
                {/*<DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)}/>*/}
            </MainLayout>
        );
    }
};
const mapActionToProps = (dispatch) => (
    {
        getNewsDetails: (details) => dispatch(getNewsDetails(details)),
        getNews: (query) => dispatch(getNews(query)),
        getNewsByID: (id) => dispatch(getNewsById(id)),
        getHadis: () => dispatch(getHadis()),
    }
);

const mapStateToProps = ({prayer, iac, app}) => {
    const {dateNow, weeksPrayers, gotResponse, todayPrayer} = prayer;
    const {news} = iac;
    const {routeWatch} = app;
    return {dateNow, weeksPrayers, gotResponse, todayPrayer, news, routeWatch}
};

export default connect(mapStateToProps, mapActionToProps)(MainPage);
