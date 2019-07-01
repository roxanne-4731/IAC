import React, {Component} from 'react';
import {Text, View, Image, I18nManager} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {getCalender, getRouteChanging} from "../store/actions";
import AllImaged from '../assets/img/allImages';
import {IranSans, RobotoFont} from "../utils/Fonts";
import * as functions from '../helper/functions';
import {width, TABS_HEIGHT} from "../assets/js/variable";
import {SOURCE} from "../helper/source";

import Splash from '../components/Splash';
import IntroPage from '../pages/IntroPage';
import MainPage from '../pages/MainPage';
import NewsPage from '../pages/NewsPage';
import SettingPage from '../pages/SettingPage';
import QiblaPage from '../pages/QiblaPage';
import GuidPage from '../pages/GuidPage';
import NewsDetailsPage from '../components/NewsDetails';
import GuidesDetailsPage from '../components/guidesDetails';
import Prayer from '../components/Prayer';

const FOOTER_BUTTONS_SIZE = (width / 15);
const IS_RTL = I18nManager.isRTL;
const FOOTER_TAB = width / 6;

const TabIconHome = ({focused, title}) => {
    const image = focused ? AllImaged.homeActive : AllImaged.home;
    const color = focused ? '#1e5da8' : '#959595';
    return (
        <View style={styles.tabItemsStyles}>
            <Image style={styles.imageStyle} source={image}/>
            <Text style={[styles.textStyle, {color}]}>{title}</Text>
        </View>
    )
};

const TabIconSetting = ({focused, title}) => {
    const image = focused ? AllImaged.setttingsActive : AllImaged.settings;
    const color = focused ? '#1e5da8' : '#959595';

    return (
        <View style={styles.tabItemsStyles}>
            <Image style={styles.imageStyle} source={image}/>
            <Text style={[styles.textStyle, {color}]}>{title}</Text>
        </View>
    )
};

const TabIconNews = ({focused, title}) => {
    const color = focused ? '#1e5da8' : '#959595';

    return (
        <View style={styles.tabItemsStyles}>
            <Image style={styles.imageStyle} source={focused ? AllImaged.newsActive : AllImaged.news}/>
            <Text style={[styles.textStyle, {color}]}>{title}</Text>
        </View>
    )
};

const TabIconQibla = ({focused, title}) => {
    const color = focused ? '#1e5da8' : '#959595';

    return (
        <View style={styles.tabItemsStyles}>
            <Image style={styles.imageStyle} source={focused ? AllImaged.qiblaActive : AllImaged.qibla}/>
            <Text style={[styles.textStyle, {color}]}>{title}</Text>
        </View>
    )
};

const TabIconGuid = ({focused, title}) => {
    const color = focused ? '#1e5da8' : '#959595';
    return (
        <View style={styles.tabItemsStyles}>
            <Image style={styles.imageStyle} source={focused ? AllImaged.guidActive : AllImaged.guid}/>
            <Text style={[styles.textStyle, {color}]}>{title}</Text>
        </View>
    )
};

class RouterComponent extends Component {
    state = {
        language: ''
    };

    componentWillMount() {
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        functions.retrieveData('@LOCATION_INFO').then((res) => {
            const json = JSON.parse(res);
            this.setState({language: json.language});
            if (!functions.isObjEmpty(json) && json) {
                const data = {
                    lat: json.lat,
                    lng: json.lng,
                    year,
                    month,
                    method: 7
                };
                this.props.getCalender(data);
            }
        }).catch((err) => {
            console.log('errorooo ==> ', err);
        });
    }

    render() {
        const {language} = this.state;
        return (
            <Router>
                <Scene
                    key="root"
                    headerLayoutPreset="center"
                >
                    <Scene key="tabbar"
                           tabs
                           tabBarStyle={styles.tabBar}
                           showLabel={false}
                           default="mainPage"
                           hideNavBar
                           animationEnabled
                           swipeEnabled={true}
                           wrap
                    >
                        <Scene key="setting" title={SOURCE.setting[language]} icon={TabIconSetting}
                               lazy>
                            <Scene
                                title={SOURCE.setting[language]}
                                key="settingPage"
                                component={SettingPage}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                            />
                        </Scene>
                        <Scene key="qibla" title={SOURCE.qibla[language]} icon={TabIconQibla}
                               lazy>
                            <Scene
                                title={SOURCE.qibla[language]}
                                key="qiblaPag"
                                component={QiblaPage}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                            />
                        </Scene>
                        <Scene
                            key="mainPage"
                            title={SOURCE.home[language]}
                            icon={TabIconHome}
                            component={MainPage}
                            onEnter={() => {
                                this.props.getRouteChanging(true);
                            }}
                            onExit={() => {
                                this.props.getRouteChanging(false);
                            }}
                            hideNavBar
                            initial
                        />
                        <Scene key="guid"
                               title={SOURCE.guieds[language]}
                               icon={TabIconGuid}
                               lazy
                        >
                            <Scene
                                title={SOURCE.guieds[language]}
                                key="newsPage"
                                component={GuidPage}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                            />
                        </Scene>
                        <Scene
                            key="news"
                            title={SOURCE.news[language]}
                            icon={TabIconNews}
                            lazy
                        >
                            <Scene
                                title={SOURCE.news[language]}
                                key="newsPage"
                                component={NewsPage}
                                titleStyle={styles.titleStyle}
                                navigationBarStyle={styles.navigationBarStyle}
                            />
                        </Scene>
                    </Scene>
                    <Scene
                        key="splash"
                        component={Splash}
                        hideNavBar
                        onEnter={() => {
                        }}
                    />
                    <Scene
                        title={SOURCE.news[language]}
                        key="newsDetailPage"
                        component={NewsDetailsPage}
                        titleStyle={styles.titleStyle}
                        navigationBarStyle={styles.navigationStyle}
                        headerLayoutPreset='center'
                        hideNavBar
                    />
                    <Scene
                        title={SOURCE.guieds[language]}
                        key="guidesDetailPage"
                        component={GuidesDetailsPage}
                        titleStyle={styles.titleStyle}
                        navigationBarStyle={styles.navigationStyle}
                        headerLayoutPreset='center'
                        hideNavBar
                    />
                    <Scene
                        title={SOURCE.religiousPrayers[language]}
                        key="prayerTime"
                        component={Prayer}
                        titleStyle={styles.titleStyle}
                    />
                    <Scene
                        key="introSlider"
                        component={IntroPage}
                        hideNavBar
                    />
                </Scene>
            </Router>
        );
    }
}

const styles = {
    titleStyle: {
        fontWeight: 'normal',
        fontFamily: IS_RTL ? IranSans.IranSans : RobotoFont.RobotoItalic,
        color: '#b1b1b1',
        fontSize: 24,
    },
    navigationBarStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#33d0db',
        elevation: 0
    },
    navigationStyle: {
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: '#33d0db',
        elevation: 0,
    },
    imageStyle: {
        width: FOOTER_BUTTONS_SIZE,
        height: FOOTER_BUTTONS_SIZE,
        resizeMode: 'contain'
    },
    tabItemsStyles: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: FOOTER_TAB
    },
    tabBar: {
        borderTopWidth: 0,
        backgroundColor: '#f1f1f1',
        height: TABS_HEIGHT,
        padding: 15
    },
    textStyle: {
        color: 'black',
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    }
};

const mapActionToProps = (dispatch) => (
    {
        getCalender: (data) => dispatch(getCalender(data)),
        getRouteChanging: (watch) => dispatch(getRouteChanging(watch))
    }
);

const mapStateToProps = ({iac}) => {
    const {languages} = iac;
    return {languages};
};


export default connect(null, mapActionToProps)(RouterComponent);
