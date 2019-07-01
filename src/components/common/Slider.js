import React from 'react';
import {
    Animated,
    Text,
    View,
    I18nManager
} from 'react-native';
import Swiper from 'react-native-swiper';
import {RobotoFont} from '../../utils/Fonts';

const IS_RTL = I18nManager.isRTL;

const styles = {
    wrapper: {
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontFamily: RobotoFont.RobotoRegular,
        flexWrap: 'wrap',
        padding: 20
    },
    buttonText: {
        color: '#fff',
        fontSize: 30,
    }
};

export default (props) =>
    <View style={{flex: 1}}>
        <Swiper
            style={styles.wrapper}
            showsButtons
            showsPagination={false}
            nextButton={IS_RTL ? <Text style={styles.buttonText}>‹</Text> : <Text style={styles.buttonText}>›</Text>}
            prevButton={IS_RTL ? <Text style={styles.buttonText}>›</Text> : <Text style={styles.buttonText}>‹</Text>}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <Animated.Text style={[styles.text, {fontSize: props.fontSize}]}>
                    Löksås ipsum sig blivit där ska åker söka redan hela, flera år vidsträckt </Animated.Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <Animated.Text style={[styles.text, {fontSize: props.fontSize}]}>
                    Löksås ipsum sig blivit där ska åker söka redan hela, flera år vidsträckt</Animated.Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
            }}>
                <Animated.Text style={[styles.text, {fontSize: props.fontSize}]}>
                    Löksås ipsum sig blivit där ska åker söka redan hela, flera år vidsträckt</Animated.Text>
            </View>
        </Swiper>
    </View>;
