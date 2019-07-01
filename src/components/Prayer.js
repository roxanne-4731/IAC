import React, {Component} from 'react';
import {View, Text, Image, I18nManager} from 'react-native';
import {connect} from 'react-redux';
import AllImages from '../assets/img/allImages';
import Layout from '../layout/LayoutCenter';
import Swiper from 'react-native-swiper';
import {IranSans, RobotoFont} from "../utils/Fonts";
import * as functions from '../helper/functions';
import {Days} from '../helper/days';
import {DayTime} from '../helper/dayTime';
import {height, width} from "../assets/js/variable";
import Loading from "./Loading";

const BOX_WIDTH = width - 60;
const ICON_SIZE = width / 15;
const BUTTON_WIDTH = (width / 2) - 60;
const SLIDER_HEIGHT = height - 80;
const IS_RTL = I18nManager.isRTL;

class Prayer extends Component {

    state = {
        language: '',
        prayersTime: [],
        show: false
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({show: true})
        }, 300);
        let prayersTime = this.props.weeksPrayers.filter((item, index) => index < 7);
        this.setState({prayersTime});
        functions.retrieveData('@LOCATION_INFO').then((res) => {
            const language = JSON.parse(res).language;
            this.setState({language});
        });
    };

    changeDateFormat = (date) => {
        return IS_RTL ? functions.miladiToShamsi(date) : date;
    };

    createSwiper() {
        return (
            <Swiper
                showsButtons
                nextButton={<Text/>}
                prevButton={<Text/>}
                height={SLIDER_HEIGHT}
                loop
            >
                {
                    this.state.prayersTime.map((item, index) => {
                        const {timings} = item;
                        const {date} = item;
                        return (
                            <View key={index}>
                                <View style={styles.dayTimeStyle}>
                                    <Text
                                        style={styles.dayStyle}>{Days[date.gregorian.weekday.en][this.state.language]}</Text>
                                    <Text
                                        style={styles.dateStyle}>{this.changeDateFormat(date.gregorian.date)}</Text>
                                </View>
                                {
                                    DayTime.map((time, index) => {
                                        return (
                                            <View key={index} style={styles.boxContainerStyle}>
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <Image style={styles.iconStyle} source={AllImages.qiblaActive}/>
                                                    <View>
                                                        <Text
                                                            style={styles.textStyle}>{time.lan[this.state.language]}</Text>
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text
                                                        style={styles.timeStyle}>{timings[time.name].slice(0, 5)}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </Swiper>
        )
    };

    render() {
        return (
            <Layout showbottons={false} colors={['#f2f2f2', '#fff']}>
                {
                    !this.state.show &&
                    <View style={{marginTop: height / 3, display: this.state.show ? 'none' : 'flex'}}>
                        <Loading/>
                    </View>
                }
                {this.state.show && this.createSwiper()}
            </Layout>
        );
    }
}

const styles = {
    iconStyle: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        resizeMode: 'contain',
        marginRight: 10
    },
    boxContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: BOX_WIDTH,
        marginHorizontal: 30,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#b4c6dd',
        borderRadius: 10,
        marginBottom: 10
    },
    dayTimeStyle: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20
    },
    dayStyle: {
        color: '#185ca9',
        fontSize: 18,
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular,
        marginRight: 10
    },
    dateStyle: {
        color: '#185ca9',
        fontSize: 18,
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    textStyle: {
        color: '#1e5da8',
        fontSize: 16
    },
    timeStyle: {
        fontSize: 20,
        color: '#fff',
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    buttonStyle: {
        width: BUTTON_WIDTH,
        marginHorizontal: 30,
        backgroundColor: '#33d0db',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        alignSelf: 'flex-end'
    },
    buttonLabel: {
        fontSize: 18,
        color: '#fff'
    },
    arrowForwardStyle: {
        color: '#fff'
    },
    wrapper: {
        flex: 1
    }
};

const mapStateToProps = ({prayer}) => {
    const {weeksPrayers} = prayer;
    return {weeksPrayers};
};

export default connect(mapStateToProps)(Prayer);
