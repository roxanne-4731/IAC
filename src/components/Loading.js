import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import {width, height} from "../assets/js/variable";

const LOADING_HEIGHT = width / 5;

export default class BasicExample extends React.Component {
    render() {
        return (
            <View style={{flex: 1 , justifyContent: 'center', alignItems: 'center' }}>
                <LottieView style={{height: LOADING_HEIGHT}} source={require('../assets/json/loader')} autoPlay loop/>
            </View>
        )
    }
}