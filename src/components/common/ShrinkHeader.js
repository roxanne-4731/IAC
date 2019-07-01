import React, {Component} from 'react';
import {Animated, View, ScrollView, StyleSheet, I18nManager, Easing} from 'react-native';
import {height, TABS_HEIGHT, HEADER_HEIGHT, HADIS_HEIGHT, width} from '../../assets/js/variable'
import {connect} from 'react-redux';
import {getScrollAmount, getOffsetAnim} from '../../store/actions'
import AllImages from '../../assets/img/allImages';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const CONTENT_HEIGHT = height - TABS_HEIGHT;
const IS_RTL = I18nManager.isRTL;

class ShrinkHeader extends Component {
    state = {
        scrollAnim: new Animated.Value(0),
        offsetAnim: new Animated.Value(0),
    };

    componentDidMount() {
        this.state.scrollAnim.addListener(this._handleScroll);
    }

    componentWillUnmount() {
        this.state.scrollAnim.removeListener(this._handleScroll);
    }

    _handleScroll = ({value}) => {
        this._previousScrollvalue = this._currentScrollValue;
        this._currentScrollValue = value;
        this.setState({scrollAmount: Math.trunc(value)});
        this.props.getScrollAmount(this.state.scrollAnim);
        this.props.getOffsetAnim(this.state.offsetAnim);
    };

    getComponent(key) {
        return this.props.children.filter((comp) => {
            return comp.key === key;
        });
    }

    render() {
        const {scrollAnim, offsetAnim} = this.state;
        const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, -HEADER_HEIGHT / 2],
            extrapolate: 'clamp'
        });
        const translateY2 = Animated.add(scrollAnim, offsetAnim).interpolate({
            inputRange: [0, HEADER_HEIGHT],
            outputRange: [0, HEADER_HEIGHT /15],
            extrapolate: 'clamp'
        });
        return (
            <View style={styles.container}>
                <AnimatedScrollView
                    contentContainerStyle={styles.gallery}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollAnim }}}],
                    )}
                >
                    {this.getComponent('content')}
                </AnimatedScrollView>
                <Animated.Image source={AllImages.behindScence}
                                style={{
                                    position: 'absolute',
                                    transform: [{scaleX: IS_RTL ? -1 : 1}, {translateY :translateY2 }],
                                    height: HEADER_HEIGHT - 50 + 100,
                                    width: width,
                                    resizeMode: 'cover',
                                    right: 0,
                                    left: 0,
                                    top: -100,
                                    bottom: 0,
                                }}
                />
                <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
                    <Animated.Image source={AllImages.mosque}
                                    style={{
                                        transform: [{scaleX: IS_RTL ? -1 : 1}],
                                        height: HEADER_HEIGHT,
                                        width: width,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        right: 0,
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                    }}
                    />
                    {this.getComponent('header')}
                </Animated.View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        height: CONTENT_HEIGHT,
        position: 'relative'
    },
    gallery: {
        paddingTop: HEADER_HEIGHT + HADIS_HEIGHT,
        backgroundColor: 'green',
        position: 'relative',
    },
    header: {
        position: 'absolute',
        height: HEADER_HEIGHT - 50,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 0
    }
});


const mapActionsToProps = (dispatch) => (
    {
        getScrollAmount: (amount) => dispatch(getScrollAmount(amount)),
        getOffsetAnim: (amount) => dispatch(getOffsetAnim(amount))
    }
);

export default connect(null, mapActionsToProps)(ShrinkHeader);
