import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';
import {connect} from "react-redux";
import * as functions from '../helper/functions';

let IS_MUTE = true;

functions.retrieveData('@MUTE').then((res) => {
    IS_MUTE = JSON.parse(res).mute;
});

class pushNotif extends Component {

    componentDidMount() {
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('notification ===> ', notification);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: IS_MUTE
            },
            popInitialNotification: true,
            requestPermissions: true
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = ({app}) => {
    const {isMute} = app;
    return {isMute}
};

export default connect(mapStateToProps)(pushNotif);
