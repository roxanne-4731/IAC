import React, {Component} from 'react';
import {Text, View, Image, StatusBar, TouchableOpacity, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AllImages from '../assets/img/allImages';
import {RobotoFont} from "../utils/Fonts";
import {height} from '../assets/js/variable';

const HEIGHT_PATTERN = height / 2;


export default class Layout extends Component {

    render() {
        const {arrowStyle, buttonsContainerStyle, buttonsStyle} = styles;
        return (
            <LinearGradient colors={this.props.colors} style={styles.viewStyles}>
                <StatusBar backgroundColor="#3b5998" barStyle="light-content"/>
                <View style={{
                    flex: 1,
                    zIndex: 1,
                    flexDirection: 'column',
                }}>
                    {this.props.children}
                </ View>
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 0}}>
                    <Image style={styles.patternStyle} source={AllImages.pattern}/>
                </View>
                {
                    this.props.showBottons &&
                    <Animated.View style={[buttonsContainerStyle, {zIndex: this.props.zIndex}]}>
                        <View style={buttonsStyle}>
                            <View>
                                {
                                    this.props.rightButton
                                        ? <TouchableOpacity
                                            onPress={this.props.onDone}
                                            style={{flexDirection: 'row', alignItems: 'center'}}
                                        >
                                            <Text style={styles.buttonLabelStyle}>
                                                Done
                                            </Text>
                                            <Image style={arrowStyle} source={AllImages.arrowRight}/>
                                        </TouchableOpacity>
                                        : <View/>
                                }
                            </View>
                        </View>
                    </Animated.View>
                }
            </ LinearGradient>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        position: 'relative',
    },
    buttonLabelStyle: {
        color: '#fff',
        fontSize: 20,
        fontFamily: RobotoFont.RobotoRegular,
    },
    patternStyle: {
        width: null,
        height: HEIGHT_PATTERN,
        resizeMode: 'cover',
        opacity: 0.5
    },
    arrowStyle: {
        resizeMode: 'contain',
        width: 8,
        marginLeft: 10,
        marginTop: 5
    },
    buttonsContainerStyle: {
        position: 'relative',
        padding: 10,
        height: height / 9,
    },
    buttonsStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    backButtonStyle: {
        backgroundColor: '#1e5da8',
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIconStyle: {
        fontSize: 30,
        color: '#fff'
    }
};
