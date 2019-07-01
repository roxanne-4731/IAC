import React, {Component} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import MainLayout from '../layout/MainLayout';
import {magnetometer} from "react-native-sensors";
import AllImages from "../assets/img/allImages";
import * as functions from '../helper/functions';
import {RobotoFont} from "../utils/Fonts";
import {height, width} from "../assets/js/variable";
import Loading from "../components/Loading";

const SIZE = height / 20;
let ANGLE_MINES = 0;
let ANGLE = 0;
let ANGLE_PLUS = 0;
const DIVIDER_WIDTH = width / 1.5 ;


export default class Qibla extends Component {
    state = {
        magnetometer: '',
        spinValue: new Animated.Value(0),
        qiblaDegree: 0,
        location: '',
        show: false
    };

    componentDidMount() {
        functions.retrieveData('@LOCATION_INFO').then((res) => {
            const storage = JSON.parse(res);
            const degree = storage.qiblaDegree;
            const location = storage.location;
            this.setState({qiblaDegree: degree, location})
        });
        setTimeout(() => {
            this.setState({show: true});
        }, 500);
        this._toggle();
    };

    componentWillUnmount() {
        this._unsubscribe();
    };

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = async () => {
        magnetometer.subscribe((magnetometer) => {
            this.setState({
                magnetometer: this._angle(magnetometer)
            });
        });
    };
    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };
    _angle = (magnetometer) => {
        let angle;
        if (magnetometer) {
            let {x, y, z} = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        if (ANGLE_MINES !== angle && ANGLE_PLUS !== angle && ANGLE !== angle) {
            ANGLE = angle;
            ANGLE_PLUS = angle + 2;
            ANGLE_MINES = angle - 2;
            return Math.round(angle);
        } else {
            return Math.round(ANGLE);
        }
    };

    _direction = (degree) => {
        if (degree >= 22.5 && degree < 67.5) {
            return 'NE';
        } else if (degree >= 67.5 && degree < 112.5) {
            return 'E';
        } else if (degree >= 112.5 && degree < 157.5) {
            return 'SE';
        } else if (degree >= 157.5 && degree < 202.5) {
            return 'S';
        } else if (degree >= 202.5 && degree < 247.5) {
            return 'SW';
        } else if (degree >= 247.5 && degree < 292.5) {
            return 'W';
        } else if (degree >= 292.5 && degree < 337.5) {
            return 'NW';
        } else {
            return 'N';
        }
    };
    _degree = (magnetometer) => {
        return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
    };

    render() {
        const {directionTextStyle, qiblaContainer, locationStyle, dividerStyle} = styles;
        return (
            <MainLayout>
                {
                    this.state.show ?  <View style={qiblaContainer}>
                        <Text style={directionTextStyle}>{this._direction(this._degree(this.state.magnetometer))}</Text>
                        <Animated.View
                            style={{
                                transform: [{rotate: 90 - this.state.magnetometer + 'deg'}]
                            }}>
                            <Image source={AllImages.compass} style={{
                                height: width - 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                            }}/>
                            <Image source={AllImages.compassPoint} style={{
                                position: 'absolute',
                                height: width - 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                                transform: [{rotate: this.state.qiblaDegree + 'deg'}]
                            }}/>
                        </Animated.View>
                        <View style={{ flexDirection: 'column'}}>
                            <Text style={locationStyle}>{this.state.location ? this.state.location : 'No Location'}</Text>
                            <Image
                                style={dividerStyle}
                                source={AllImages.divider}/>
                        </View>
                    </View> : <Loading />
                }
            </MainLayout>
        );
    }
}

const styles = {
    qiblaContainer: {
        width: width,
        alignItems: 'center',
        marginTop: SIZE,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    directionTextStyle: {
        color: '#1b4fa9',
        fontSize: height / 26,
        marginBottom: SIZE,
        fontFamily: RobotoFont.RobotoBold,
    },
    locationStyle: {
        textAlign: 'center',
        marginTop: SIZE,
        fontFamily: RobotoFont.RobotoRegular,
        // color: '#1b4fa9'
        color: '#444444'
    },
    dividerStyle: {
        width: DIVIDER_WIDTH,
        height: 20,
        resizeMode: 'contain',
    }
};
