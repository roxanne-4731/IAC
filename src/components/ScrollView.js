import React, {Component} from 'react';
import {
    Animated, I18nManager,
    Image,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
import {IranSans, RobotoFont} from "../utils/Fonts";
import AllImages from "../assets/img/allImages";
import {width, height} from "../assets/js/variable";
import {Actions} from "react-native-router-flux";
import {getNews, getNewsById, getNewsDetails} from "../store/actions";
import * as functions from "../helper/functions";
import Header from '../components/Header';
import Loading from '../components/Loading';
import LottieView from 'lottie-react-native';

const IS_RTL = I18nManager.isRTL;
const BOX_WIDTH = width - 60;
const PHOTO_SIZE = width / 6;
const HEADER_MAX_HEIGHT = height / 3 + 60;
const HEADER_MIN_HEIGHT = HEADER_MAX_HEIGHT / 2;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const HADIS_ICONS = width / 7;
const DIVIDER_WIDTH = width / 6;


class ScrollableHeader extends Component {
    state = {
        scrollY: new Animated.Value(0),
        hadisHeight: 0,
        headerHeight: HEADER_MAX_HEIGHT,
        language: '',
        refreshing: false,
        newsWidth: 0,
        newsHeight: 0
    };

    componentDidMount() {
        if (this.props.routeWatch) {
            this.animation.play();
            this.animationTwo.play();
        }
        functions.retrieveData('@LOCATION_INFO').then((res) => {
            const storage = JSON.parse(res);
            const language = storage.language;
            this.setState({language, location})
        });

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.routeWatch !== nextProps.routeWatch) {
            this.animation.play();
            this.animationTwo.play();
        }
    }

    measureView({nativeEvent}) {
        const hadisHeight = nativeEvent.layout.height;
        this.setState({hadisHeight});
    }

    measureNewsHeight(layout) {
        const {width, height} = layout;
        const newsHeight = height;
        const newsWidth = width;
        setTimeout(() => {
            this.setState({newsHeight, newsWidth});
        }, 1000);
    }

    measureViewHeight({nativeEvent}) {
        const headerHeight = nativeEvent.layout.height;
        this.setState({headerHeight});
    }

    onNewsPress(id) {
        this.props.getNewsByID(id);
        Actions.newsDetailPage();
    }

    handleImage = (id) => {
        return functions.getImage(id);
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        setTimeout(() => {
            this.setState({refreshing: false});
        }, 1000);
        console.log('refreshing ');
    };

    render() {
        const {hadisHeight} = this.state;
        const {languages} = this.props;

        const {news, todayPrayer} = this.props;

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const header = this.state.scrollY.interpolate(
            {
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT - 10],
                extrapolate: 'clamp',
            }
        );
        const opacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0.5, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const translateY = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        });
        const mosqueTranslateY = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, HEADER_MIN_HEIGHT / 2],
            extrapolate: 'clamp',
        });
        const scale = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [1, .6],
            extrapolate: 'clamp'
        });
        const marginBottom = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [20, 40],
            extrapolate: 'clamp'
        });
        const marginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [30, 40],
            extrapolate: 'clamp'
        });
        // let shadowOpt = {
        //     width: newsWidth,
        //     height: newsHeight,
        //     color: "#000",
        //     border:2,
        //     radius:3,
        //     opacity: 0.1,
        //     x: 0,
        //     y: 0,
        //     style: {
        //         padding: 5
        //     }
        // };

        return (
            <View style={{flex: 1, position: 'relative'}}>
                <Animated.View
                    onLayout={(event) => this.measureViewHeight(event)}
                    style={[styles.header, {transform: [{translateY: headerHeight}]}]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage2,
                            {transform: [{scaleX: IS_RTL ? -1 : 1}, {translateY: imageTranslate}]},
                        ]}
                        source={AllImages.behindScence}
                    />
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {transform: [{scaleX: IS_RTL ? -1 : 1}, {scale}, {translateY: mosqueTranslateY}]},
                        ]}
                        source={AllImages.mosqueAlone}
                    />
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }} source={require('../assets/json/wind')}
                        loop/>
                    <LottieView
                        ref={animation => {
                            this.animationTwo = animation;
                        }}
                        style={{transform: [{scaleY: -1}]}}
                        progress={1}
                        source={require('../assets/json/wind')}
                        loop
                    />
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {transform: [{scaleX: IS_RTL ? -1 : 1}]},
                        ]}
                        source={AllImages.zamin}
                    />
                    {
                        this.props.gotResponse
                            ? !functions.isObjEmpty(todayPrayer) &&
                            <Animated.View style={{height: header, transform: [{translateY: imageTranslate}]}}>
                                <Header marginBottom={marginBottom} opacity={opacity} marginTop={marginTop}/>
                            </Animated.View>
                            : <Loading/>
                    }
                </Animated.View>
                {
                    !functions.isObjEmpty(this.props.hadis) && this.props.hadis ?
                        <Animated.View onLayout={(event) => this.measureView(event)}
                                       style={[styles.viewListStyle2, {
                                           transform: [{translateY}],
                                           top: HEADER_MAX_HEIGHT - 20,
                                       }]}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingHorizontal: 10,
                                marginBottom: 10
                            }}>
                                <Image style={styles.dividerStyle} source={AllImages.leftDivider}/>
                                <Text style={styles.newsTitleStyle}>{this.props.hadis.title}</Text>
                                <Image style={styles.dividerStyle} source={AllImages.rightDivider}/>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style={styles.hadisIconStyle} source={AllImages.rightHadis}/>
                                <Text style={styles.speechStyle}>
                                    {this.props.hadis.body}
                                </Text>
                                <Image style={styles.hadisIconStyle} source={AllImages.leftHadis}/>
                            </View>
                        </Animated.View> : <View style={{marginTop: 10}}/>
                }
                <ScrollView
                    style={{flex: 1}}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    scrollEventThrottle={16}
                >
                    <View
                        onLayout={(event) => this.measureNewsHeight(event.nativeEvent.layout)}
                        style={[
                            styles.viewListStyle, {
                                minHeight: height - HEADER_MIN_HEIGHT,
                                marginTop: hadisHeight + HEADER_MAX_HEIGHT,
                            }]}
                    >
                        {
                            !this.props.newsRes ?
                                <View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            paddingHorizontal: 20,
                                            marginBottom: 25,
                                            alignItems: 'center'
                                        }}>
                                        <Image style={styles.dividerStyle} source={AllImages.leftDivider}/>
                                        <Text style={styles.newsTitleStyle}>{languages.news}</Text>
                                        <Image style={styles.dividerStyle} source={AllImages.rightDivider}/>
                                    </View>
                                    {news.map((item) => (
                                        <TouchableOpacity key={item.id}
                                                          onPress={this.onNewsPress.bind(this, item.id)}>
                                            <View style={styles.newsBoxStyle}>
                                                {
                                                    item.image_id ? <Image
                                                            source={{uri: this.handleImage(item.image_id)}}
                                                            style={styles.photo}/> :
                                                        <View style={styles.photo}/>
                                                }

                                                <Text style={styles.newsTextStyle}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                : <View style={{marginTop: HEADER_MAX_HEIGHT / 3}}><Loading/></View>
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const
    styles = StyleSheet.create({
        newsTitleBoxStyle: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 15,
            paddingTop: 20
        },
        newsTitleStyle: {
            flex: 1,
            flexWrap: 'wrap',
            fontSize: 18,
            textAlign: 'center',
            color: '#b1b1b1',
            fontFamily: IS_RTL ? IranSans.IranSansBold : RobotoFont.RobotoBold
        },
        dividerStyle: {
            resizeMode: 'contain',
            width: DIVIDER_WIDTH,
            transform: [{scaleX: IS_RTL ? -1 : 1}]
        },
        photo: {
            height: PHOTO_SIZE,
            width: PHOTO_SIZE,
            resizeMode: 'contain',
            marginRight: 10,
            backgroundColor: '#eee'
        },
        newsBoxStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            marginBottom: 15
        },
        viewListStyle: {
            flex: 1,
            backgroundColor: '#fff',
            marginHorizontal: 30,
            marginBottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: 4},
            shadowRadius: 5,
            zIndex: 1,
            elevation: 5,
            padding: 20
        },
        viewListStyle2: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {width: 0, height: 4},
            shadowRadius: 5,
            elevation: 5,
            backgroundColor: '#fff',
            marginHorizontal: 30,
            zIndex: 2,
        },
        newsTextStyle: {
            fontSize: 14,
            flex: 1,
            flexWrap: 'wrap',
            color: '#b1b1b1',
            fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
        },
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: HEADER_MAX_HEIGHT,
            width: width,
            backgroundColor: '#03A9F4',
            overflow: 'hidden',
            zIndex: 1
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: width,
            height: HEADER_MAX_HEIGHT,
            resizeMode: 'contain',
            zIndex: 0
        },
        backgroundImage2: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: width,
            height: HEADER_MAX_HEIGHT,
            resizeMode: 'contain',
            zIndex: 0
        },
        hadithStyle: {
            position: 'relative',
            width: BOX_WIDTH,
        },
        hadithBoxStyle: {
            position: 'relative',
            zIndex: 1,
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
        },
        hadisIconStyle: {
            resizeMode: 'contain',
            width: HADIS_ICONS,
            height: HADIS_ICONS / 2,
            transform: [{scaleX: IS_RTL ? -1 : 1}]
        },
        speechStyle: {
            fontSize: 14,
            flex: 1,
            flexWrap: 'wrap',
            textAlign: 'center',
            paddingHorizontal: 10,
            fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
        }
    });

const
    mapStateToProps = ({iac, prayer, app}) => {
        const {news, hadis, newsRes, languages} = iac;
        const {routeWatch} = app;
        const {gotResponse, todayPrayer} = prayer;
        return {news, hadis, gotResponse, todayPrayer, routeWatch, newsRes, languages};
    };

const
    mapActionToProps = (dispatch) => (
        {
            getNewsDetails: (details) => dispatch(getNewsDetails(details)),
            getNews: () => dispatch(getNews()),
            getNewsByID: (id) => dispatch(getNewsById(id))
        }
    );

export default connect(mapStateToProps, mapActionToProps)

(
    ScrollableHeader
)
;