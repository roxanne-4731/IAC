import React, {Component} from 'react';
import {Button} from 'native-base';
import {Text, Image, Dimensions, I18nManager} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import AllImages from '../assets/img/allImages';
import {RobotoFont} from "../utils/Fonts";

const FOOTER_BUTTONS_SIZE = (Dimensions.get('window').width / 5) - 30;
const FOOTER_HEIGHT = (Dimensions.get('window').height / 10 );
const IS_RTL = I18nManager.isRTL;

export default class FooterTabsIconExample extends Component {
    state = {
        home: 'home',
        settings: 'settings',
        news: 'news',
        qibla: 'qibla',
        guid: 'guid'
    };

    navigateFooter(item) {
        switch (item) {
            case 'settings':
                this.setState({
                    home: 'home',
                    settings: 'setttingsActive',
                    news: 'news',
                    qibla: 'qibla',
                    guid: 'guid'
                });
                console.log('setting');
                break;
            case 'qibla':
                this.setState({
                    home: 'home',
                    settings: 'settings',
                    news: 'news',
                    qibla: 'qiblaActive',
                    guid: 'guid'
                });
                break;
            case 'home':
                this.setState({
                    home: 'homeActive',
                    settings: 'settings',
                    news: 'news',
                    qibla: 'qibla',
                    guid: 'guid'
                });
                break;
            case 'guid':
                this.setState({
                    home: 'home',
                    settings: 'settings',
                    news: 'news',
                    qibla: 'qibla',
                    guid: 'guidActive'
                });
                break;
            case 'news':
                this.setState({
                    home: 'home',
                    settings: 'settings',
                    news: 'newsActive',
                    qibla: 'qibla',
                    guid: 'guid'
                });
                break;
            default:
                console.log('default case');
        }
    }

    render() {
        const {home, settings, guid, qibla, news} = this.state;
        const {footerStyle, imageStyle, footerTextStyle} = styles;
        return (
            <LinearGradient colors={[ '#e5e5e5', '#f2f2f2']} style={footerStyle}>
                <Button vertical transparent
                        onPress={() => {
                            Actions.settingPage({type: 'reset'});
                        }}
                >
                    <Image
                        style={imageStyle}
                        source={AllImages[settings]}
                    />
                    <Text style={footerTextStyle}>{IS_RTL? 'تنظیمات' : 'Settings'}</Text>
                </Button>
                <Button vertical transparent
                        onPress={() => {
                            Actions.qiblaPage({type: 'reset'});
                        }}
                >
                    <Image
                        style={imageStyle}
                        source={AllImages[qibla]}
                    />
                    <Text>{IS_RTL? 'قبله' : 'Qibla'}</Text>
                </Button>
                <Button vertical transparent
                        onPress={() => {
                            Actions.mainPage({type: 'reset'});
                        }}
                >
                    <Image
                        style={imageStyle}
                        source={AllImages[home]}
                    />
                    <Text style={footerTextStyle}>{IS_RTL? 'خانه' : 'Home'}</Text>
                </Button>
                <Button vertical transparent
                        onPress={
                            () => {
                                Actions.newsPage({type: 'reset'});
                            }}
                >
                    <Image
                        style={imageStyle}
                        source={AllImages[guid]}
                    />
                    <Text style={footerTextStyle}>{IS_RTL? 'راهنمای شیعه' : 'Shia Guade'}</Text>
                </Button>
                <Button vertical transparent
                        onPress={() => {
                            Actions.newsPage({type: 'reset'});
                        }}
                >
                    <Image
                        style={imageStyle}
                        source={AllImages[news]}
                    />
                    <Text style={footerTextStyle}>{IS_RTL? 'اخبار' : 'Nyheter'}</Text>
                </Button>
            </LinearGradient>
        );
    }
}
const styles = {
    footerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 5,
        height: FOOTER_HEIGHT,
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 10,
            width: 0
        },
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    imageStyle: {
        width: FOOTER_BUTTONS_SIZE,
        height: FOOTER_BUTTONS_SIZE / 2,
        marginHorizontal: 15,
        resizeMode: 'contain'
    },
    footerTextStyle: {
        fontFamily: RobotoFont.RobotoRegular,
        flexWrap: 'wrap'
    }
};
