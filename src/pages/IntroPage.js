import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    I18nManager,
    PermissionsAndroid,
    Platform,
    Animated,
    Keyboard,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import Layout from '../layout/LayoutCenter';
import Slider from '../components/common/Slider';
import CountryPicker from '../components/CountryLocation';
import {RobotoFont} from '../utils/Fonts';
import AllImages from '../assets/img/allImages';
import GetLocation from '../components/GetLocation'
import * as functions from '../helper/functions';
import RNRestart from 'react-native-restart';
import {DropDownHolder} from '../helper/dropDownHolder';
import DropdownAlert from 'react-native-dropdownalert';
import api from '../api/location';
import {width, height} from "../assets/js/variable";
import {Spinner} from "../components/common/index";
import {getLocation, getLocations, getQiblaDegree} from "../store/actions";


const IMAGE = width / 3;
const SLIDER = height / 8;
const ICON_SIZE = width / 16;

class IntroPage extends Component {
    state = {
        lat: 0,
        lng: 0,
        location: '',
        useGps: true,
        keyboardHeight: new Animated.Value(0),
        imageHeight: new Animated.Value(IMAGE),
        sliderHeight: new Animated.Value(SLIDER),
        loading: false
    };


    componentDidMount() {
        if (Platform.OS === 'android') {
            this.requestLocationPermission()
        } else {
            this._getCurrentLocation()
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(this.state.keyboardHeight, {
                duration: 400,
                toValue: event.endCoordinates.height,
            }),
            Animated.timing(this.state.imageHeight, {
                duration: 400,
                toValue: IMAGE * 0.75,
            }),
            Animated.timing(this.state.sliderHeight, {
                duration: 400,
                toValue: SLIDER,
            }),
        ]).start();
    };

    _keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(this.state.keyboardHeight, {
                duration: 400,
                toValue: 0,
            }),
            Animated.timing(this.state.imageHeight, {
                duration: 400,
                toValue: IMAGE,
            }),
            Animated.timing(this.state.sliderHeight, {
                duration: 400,
                toValue: SLIDER,
            })
        ]).start();
    };

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location Permission',
                    'message': 'MyMapApp needs access to your location'
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._getCurrentLocation();
                this.setState({useGps: true});
            } else {
                this.setState({useGps: false});
            }
        } catch (err) {
            console.warn(err)
        }
    }

    onDone = () => {
        const LOCATION_INFO = {
            language: this.props.language,
            location: this.state.useGps ? this.state.location : this.props.location,
            qiblaDegree: this.props.qiblaDegree
        };
        console.log('LOCATION_INFO ::: ', LOCATION_INFO);
        if ((this.props.location !== '' || this.state.location) && this.props.language !== '') {
            functions.setItem('@LOCATION_INFO', JSON.stringify(LOCATION_INFO));
            this.props.language === 'IR' || this.props.language === 'SA' ? I18nManager.forceRTL(true) : I18nManager.forceRTL(false);
            RNRestart.Restart();
            return;
        }
        DropDownHolder.alert('warn', 'Error', 'Fill the inputs, Please!');
    };

    _getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = position.coords;
                this.setState({lat: coords.latitude, lng: coords.longitude})
            },
            (error) => {
                console.log(error)
            },
            {enableHighAccuracy: false}
        );
    };

    getLocation() {
        this.setState({loading: true});
        api.getLocationBycoords(this.state.lng, this.state.lat).then((res) => {
            this.setState({loading: false});
            this.setState({location: res.data.features[0].text});
            this.props.getQiblaDegree({lat: this.state.lat, lng: this.state.lng});
        }).catch((error) => {
            this.setState({loading: false});
            console.log(error);
        });
    };

    updateData = (data) => {
        console.log(data);
        if (!data) {
            DropDownHolder.alert('error', 'Error', 'Network Error');
        }
    };

    render() {
        const {
            imageContentStyle,
            stretch,
            titleStyle
        } = styles;
        const translateY = this.state.keyboardHeight.interpolate(
            {
                inputRange: [0, IMAGE * 0.75],
                outputRange: [0, Platform.OS === 'ios' ? -50 : -80],
                extrapolate: 'clamp',
            }
        );
        const zIndex = this.state.keyboardHeight.interpolate(
            {
                inputRange: [0, 100],
                outputRange: [1, -1],
                extrapolate: 'clamp',
            }
        );
        const fontSize = this.state.keyboardHeight.interpolate(
            {
                inputRange: [0, 100],
                outputRange: [20, 18],
                extrapolate: 'clamp',
            }
        );
        const fontSizeSlider = this.state.keyboardHeight.interpolate(
            {
                inputRange: [0, 100],
                outputRange: [18, 16],
                extrapolate: 'clamp',
            }
        );
        const marginBottom = this.state.keyboardHeight.interpolate(
            {
                inputRange: [0, 100],
                outputRange: [30, 0],
                extrapolate: 'clamp',
            }
        );
        return (
            <Layout
                colors={['#33d0db', '#3b5998']}
                showBottons
                leftButton={false}
                rightButton
                onDone={this.onDone}
                zIndex={zIndex}
            >
                <Animated.View
                    style={{flex: 1, paddingBottom: this.state.keyboardHeight, transform: [{translateY}]}}>
                    <Animated.View style={[imageContentStyle]}>
                        <Animated.Image
                            style={[stretch, {height: this.state.imageHeight}]}
                            source={AllImages.logo}
                        />
                    </Animated.View>
                    <Animated.Text style={[titleStyle, {fontSize, marginBottom}]}>Imam Ali Islamic
                        Center</Animated.Text>
                    <Animated.View
                        style={{height: this.state.sliderHeight, marginBottom: 20, marginHorizontal: 40}}>
                        <Slider fontSize={fontSizeSlider}/>
                    </Animated.View>
                    <View
                        style={{marginHorizontal: 30, position: 'relative'}}>
                        <CountryPicker/>
                        {
                            this.state.useGps ? <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#2761cd',
                                    borderWidth: 1,
                                    borderColor: '#1b4fa9',
                                    paddingHorizontal: 10,
                                    padding: 10
                                }}
                                onPress={this.getLocation.bind(this)}
                            >
                                <View style={{flexDirection: 'row'}}>
                                    <Image style={{
                                        resizeMode: 'contain',
                                        width: ICON_SIZE,
                                        height: ICON_SIZE,
                                        marginRight: 5
                                    }} source={AllImages.location}/>
                                    <Text style={{
                                        width: 200,
                                        fontSize: 18,
                                        color: '#fff',
                                        fontFamily: RobotoFont.RobotoRegular
                                    }}>{!this.state.location ? 'Current Location' : this.state.location}</Text>
                                </View>
                                {this.state.loading && <Spinner color='#fff'/>}

                            </TouchableOpacity> : <GetLocation updateData={val => this.updateData(val)}/>

                        }
                    </View>
                </Animated.View>
                <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)}/>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    imageContentStyle: {
        alignItems: 'center',
        paddingTop: 100
    },
    stretch: {
        width: IMAGE,
        resizeMode: 'contain'
    },
    titleStyle: {
        // fontSize: 20,
        color: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        marginTop: 10,
        textAlign: 'center',
        fontFamily: RobotoFont.RobotoRegular
    }
});

const mapStateToProps = ({app}) => {
    const {location, language, qiblaDegree} = app;
    return {location, language, qiblaDegree}
};

const mapActionToProps = (dispatch) => (
    {
        getLocations: (location, limit) => dispatch(getLocations(location, limit)),
        getQiblaDegree: ({lat, lng}) => dispatch(getQiblaDegree({lat, lng}))
    }
);

export default connect(mapStateToProps, mapActionToProps)(IntroPage);
