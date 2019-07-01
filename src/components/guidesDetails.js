import React, {Component} from 'react';
import {View, Text, Image, I18nManager, TouchableOpacity} from 'react-native';
import Layout from '../layout/LayoutCenter';
import HTML from 'react-native-render-html';
import {connect} from 'react-redux';
import * as functions from '../helper/functions';
import Loading from "./Loading";
import {Actions} from 'react-native-router-flux';
import {IranSans, RobotoFont} from "../utils/Fonts";
import {height, width} from "../assets/js/variable";
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AllImages from '../assets/img/allImages';

const IMAGE_SIZE = height / 6;
const IS_RTL = I18nManager.isRTL;
const PARALLAX_HEADER_HEIGHT = 300;
const STICKY_HEADER_HEIGHT = 60;
const HEIGHT_PATTERN = height / 2;
const BACK_SIZE = width / 17;
const BACK_CONTAINER = width / 7;


class NewsDetails extends Component {
    state = {
        show: false,
        backWidth: 0
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({show: true});
        }, 300);
    }

    handleContent = () => {
        return functions.isObjEmpty(this.props.guideDetails);
    };
    handleImage = (id, style) => {
        return functions.getImage(id, style);
    };

    measureView({nativeEvent}) {
        const backWidth = nativeEvent.layout.width;
        this.setState({backWidth});
    }

    render() {
        const {title, body, image_id, id} = this.props.guideDetails;
        return (
            <Layout colors={['#fff', '#f2f2f2']}
                    showBottons={false}
            >
                {
                    !this.handleContent() && this.state.show
                        ? <ParallaxScrollView
                            stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                            parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                            backgroundColor="black"
                            fadeOutForeground
                            renderBackground={() => (
                                <View>
                                    {
                                        image_id ? <Image source={{uri: this.handleImage(image_id, 'main_blur')}}
                                                          style={styles.imageStyle}/> : <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            width: window.width,
                                            backgroundColor: 'rgba(0,0,0,.4)',
                                            height: PARALLAX_HEADER_HEIGHT
                                        }}/>
                                    }

                                </View>
                            )}
                            renderStickyHeader={() => (
                                <View key="sticky-header"
                                      style={[styles.stickySection]}>
                                    <Text style={styles.stickySectionText}>{title}</Text>
                                </View>
                            )}
                            renderForeground={() => (
                                <View
                                    style={styles.parallaxHeader}>
                                    <View style={{marginBottom: 10}}>
                                        <Image style={{
                                            width: IMAGE_SIZE,
                                            height: IMAGE_SIZE,
                                            borderRadius: IMAGE_SIZE / 2,
                                            borderWidth: 2,
                                            borderColor: '#fff'
                                        }} source={image_id ? {uri: this.handleImage(image_id, 'cube')} : AllImages.logo}/>
                                    </View>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: '#fff',
                                        fontSize: 18,
                                        fontFamily: IS_RTL ? IranSans.IranSansBold : RobotoFont.RobotoBold
                                    }}>
                                        {title}
                                    </Text>
                                </View>
                            )}
                        >
                            <View key={id} style={{position: 'relative', minHeight: height}}>
                                <View style={{padding: 15}}>
                                    <HTML html={body}
                                          tagsStyles={{
                                              p: {
                                                  lineHeight: 30,
                                                  fontSize: 14,
                                                  fontFamily: IS_RTL ? IranSans.IranSans : RobotoFont.RobotoRegular
                                              }
                                          }}
                                    />
                                </View>
                            </View>
                        </ParallaxScrollView>
                        : <View style={{marginTop: height / 2 - 15}}><Loading/></View>

                }
                {
                    this.state.show &&
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
                        <Image style={styles.patternStyle} source={AllImages.pattern}/>
                    </View>
                }
                <TouchableOpacity
                    key="fixed-header"
                    style={styles.backButton}
                    onLayout={(event) => this.measureView(event)}
                    onPress={() => Actions.pop()}
                >
                    <View style={{
                        backgroundColor: '#1e5da8',
                        borderWidth: 1,
                        borderColor: 'transparent',
                        width: BACK_CONTAINER,
                        height: BACK_CONTAINER,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: BACK_CONTAINER / 2
                    }}>
                        <Image style={{
                            transform: [{scaleX: !IS_RTL ? -1 : 1}],
                            width: BACK_SIZE,
                            height: BACK_SIZE,
                            resizeMode: 'contain',
                        }} source={AllImages.arrowRight}/>
                    </View>
                </TouchableOpacity>
            </Layout>
        );
    }
}

const styles = {
    imageStyle: {
        width: width,
        height: PARALLAX_HEADER_HEIGHT
    },
    titleStyle: {
        color: '#000',
        fontSize: 16,
        marginVertical: 20,
        fontFamily: IS_RTL ? IranSans.IranSansBold : RobotoFont.RobotoRegular
    },
    descriptionStyle: {
        fontFamily: IS_RTL ? IranSans.IranSansBold : RobotoFont.RobotoRegular,
        color: '#000',
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center'
    },
    stickySectionText: {
        color: 'white',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontFamily: IS_RTL ? IranSans.IranSans : RobotoFont.RobotoRegular
    },
    parallaxHeader: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    backButton: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 0,
        zIndex: 0,
        width: BACK_CONTAINER
    },
    fixedSection: {
        position: 'absolute',
        top: 5,
        right: 10
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20,
        fontFamily: IS_RTL ? IranSans.IranSans : RobotoFont.RobotoRegular
    },
    patternStyle: {
        width: null,
        height: HEIGHT_PATTERN,
        resizeMode: 'cover',
        opacity: 0.5
    },

};
const mapStateToProps = ({iac}) => {
    const {guideDetails} = iac;
    return {guideDetails}
};

export default connect(mapStateToProps)(NewsDetails);
