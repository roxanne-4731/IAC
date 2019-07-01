import React, {Component} from 'react';
import {View, Image, StatusBar} from 'react-native';
import AllImages from "../assets/img/allImages";
import {exitAlert, handleAndroidBackButton, removeAndroidBackButtonHandler} from "../helper/exitApp";
import LinearGradient from 'react-native-linear-gradient';
import {width, height} from "../assets/js/variable";

const HEIGHT_PATTERN = height / 2;
const CONTENT_HEIGHT = height - 80;

export default class MainLayout extends Component {
    componentDidMount() {
        handleAndroidBackButton(exitAlert);
    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
    }

    render() {
        return (
            <LinearGradient colors={['#f2f2f2', '#e5e5e5']} style={styles.viewStyle}>
                <StatusBar backgroundColor="#3b5998" barStyle="light-content"/>
                <View style={styles.container}>
                    {this.props.children}
                </View>
                <Image style={styles.patternStyle} source={AllImages.pattern}/>
                {/*<Image style={styles.menubar} source={AllImages.menuBar} />*/}
            </LinearGradient>
        );
    }
}
const styles = {
    container: {
        height: CONTENT_HEIGHT,
        zIndex: 1,
        flex: 1
    },
    viewStyle: {
        flex: 1,
        position: 'relative'
    },
    patternStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: null,
        resizeMode: 'cover',
        height: HEIGHT_PATTERN,
        opacity: 0.5
    },
    menubar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: width,
        height: 25,
        resizeMode: 'repeat',
        zIndex: 1
    }
};
