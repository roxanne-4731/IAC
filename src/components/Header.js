import React, {Component} from 'react';
import {Animated, I18nManager, Image, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AllImage from '../assets/img/allImages';
import {connect} from 'react-redux';
import {IranSans, RobotoFont} from "../utils/Fonts";
import * as functions from '../helper/functions';
import {HADIS_HEIGHT, HADIS_TOP, HEADER_HEIGHT, width} from "../assets/js/variable";
import {getMuteState} from "../store/actions";

const IS_RTL = I18nManager.isRTL;
const BOX_WIDTH = (width) - 60;
const MORE_WIDTH = width;

class Header extends Component {
    _isMute = true;
    state = {
        scrollAnim: new Animated.Value(0),
        offsetAnim: new Animated.Value(0),
        scrollAmount: 0,
        todayPrayer: {},
        imageHeight: new Animated.Value(HEADER_HEIGHT),
        language: '',
        location: '',
        prayerTime: '',
        muteState: true
    };

    componentWillMount() {
        console.log('mount header');
        functions.retrieveData('@MUTE').then((res) => {
            this._isMute = JSON.parse(res).mute;
            this.setState({muteState: this._isMute});
        }).catch((err) => {
            functions.setItem('@MUTE', JSON.stringify({mute: this._isMute}));
        });
    }

    componentDidMount() {
        functions.retrieveData('@LOCATION_INFO').then((res) => {
            const storage = JSON.parse(res);
            const language = storage.language;
            const location = storage.location;
            this.setState({language, location})
        });

        let prayerTime = functions.findPrayerTime(this.props.weeksPrayers);
        this.setState({prayerTime});
    }

    changeDateFormat = () => {
        const date = this.props.todayPrayer.date.gregorian.date;
        return IS_RTL ? functions.miladiToShamsi(date) : date;
    };
    muteManage = () => {
        if (this.state.muteState) {
            return this.props.languages.unmute;
        } else {
            return this.props.languages.mute;
        }
    };

    onMutePress() {
        this._isMute = !this._isMute;
        this.setState({muteState: this._isMute});
        functions.setItem('@MUTE', JSON.stringify({mute: this._isMute}));
    };

    render() {
        const {
            container,
            title,
            muteStyle,
            muteIconStyle,
            muteTextStyle,
        } = styles;
        const {date} = this.props.todayPrayer;
        const {languages} = this.props;
        const {muteState} = this.state;
        console.log('date ::: ', date);
        return (
            <View style={container}>
                <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                    <View/>
                    <Animated.Text style={[title, {marginBottom: this.props.marginBottom}]}>
                        {this.state.location}
                    </Animated.Text>
                </View>
                <Animated.View style={{opacity: this.props.opacity}}>
                    <TouchableOpacity onPress={this.onMutePress.bind(this)}>
                        <View style={muteStyle}>
                            <Image
                                source={muteState ? AllImage.unmute : AllImage.mute}
                                style={muteIconStyle}
                            />
                            <Text style={muteTextStyle}> {this.muteManage()} </Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <View style={styles.nextPrayerContainerStyle}>
                    <Text style={styles.nextPrayerTextStyle}> {languages.nextPrayer}</Text>
                    <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                        <View/>
                        <Text style={styles.nextPrayerTimeStyle}>{this.state.prayerTime}</Text>
                    </View>
                </View>
                <Animated.View style={{opacity: this.props.opacity}}>
                    <TouchableOpacity
                        style={styles.showMoreButtonStyle}
                        onPress={() => {
                            Actions.prayerTime()
                        }}
                    >
                        <Text style={styles.showMoreTextStyle}>{languages.more}</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.dayAndDateStyle, {marginTop: this.props.marginTop}]}>
                    <Text style={styles.dateStyle}>{languages[date.gregorian.weekday.en]}</Text>
                    <Text style={styles.dayStyle}>{this.changeDateFormat()}</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginVertical: 40,
        marginHorizontal: 30
    },
    title: {
        marginBottom: 20,
        fontSize: 18,
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: RobotoFont.RobotoRegular
    },
    muteIconStyle: {
        resizeMode: 'contain',
        width: 35,
        height: null
    },
    muteStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 25,
    },
    muteTextStyle: {
        justifyContent: 'flex-start',
        color: 'rgba(255, 255, 255, 0.8)',
        padding: 5,
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    nextPrayerContainerStyle: {
        flexDirection: 'column',
        marginBottom: 20
    },
    nextPrayerTimeStyle: {
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: IS_RTL ? IranSans.IranSansBold : RobotoFont.RobotoBold,
        fontSize: 26,
        justifyContent: 'flex-start',
    },
    nextPrayerTextStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular,
    },
    showMoreButtonStyle: {
        paddingVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(117, 173, 235, 0.7)',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent',
        width: IS_RTL ? MORE_WIDTH / 5 : MORE_WIDTH / 5,
    },
    showMoreTextStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    dayAndDateStyle: {
        flexDirection: 'row'
    },
    dayStyle: {
        color: 'rgba(255, 255, 255, 1)',
        marginLeft: 5,
        fontSize: 16,
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    dateStyle: {
        color: 'rgba(160, 229, 239, 1)',
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    hadithStyle: {
        position: 'relative',
        top: HADIS_TOP - 20,
        width: BOX_WIDTH,
        left: 10,
        height: HADIS_HEIGHT,
    },
    hadithBoxStyle: {
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 5,
        elevation: 1,
        padding: 20
    },
    dividerStyle: {
        resizeMode: 'contain',
        width: 60,
        height: 10,
        marginTop: 10,
        transform: [{scaleX: IS_RTL ? -1 : 1}]
    },
    newsTitleStyle: {
        justifyContent: 'flex-start',
        fontSize: 16,
        textAlign: 'center',
        color: '#b1b1b1',
        marginHorizontal: 10,
        fontFamily: IS_RTL ? IranSans.IranSansBold : RobotoFont.RobotoRegular
    },
    hadisIconStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        transform: [{scaleX: IS_RTL ? -1 : 1}]
    },
    speechStyle: {
        justifyContent: 'flex-start',
        fontSize: 14,
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        paddingHorizontal: 5,
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    }
};

const mapActionToProps = (dispatch) => (
    {
        getMuteState: (details) => dispatch(getMuteState(details))
    }
);
const mapStateToProps = ({prayer, app, iac}) => {
    const {languages} = iac;
    const {todayPrayer, gotResponse, weeksPrayers} = prayer;
    const {scrollAmount, offsetMount} = app;
    return {todayPrayer, gotResponse, scrollAmount, offsetMount, weeksPrayers, languages};
};

export default connect(mapStateToProps, mapActionToProps)(Header);
