import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, I18nManager} from 'react-native';
import MainLayout from '../layout/MainLayout';
import AllImages from '../assets/img/allImages';
import {getGuides, getGuidesByID} from "../store/actions";
import {connect} from 'react-redux';
import {IranSans, RobotoFont} from "../utils/Fonts";
import {width, TABS_HEIGHT, height} from '../assets/js/variable';
import Loading from '../components/Loading';
import * as functions from "../helper/functions";
import {Actions} from "react-native-router-flux";

const DIVIDER_WIDTH = width / 1.5;
const PHOTO_SIZE = width / 5;
const IS_RTL = I18nManager.isRTL;

class NewsPage extends Component {
    componentWillMount() {
        this.props.getGuides();
    }

    handleImage = (id) => {
        return functions.getImage(id);
    };

    onNewsPress(id) {
        this.props.getGuidesByID(id);
        Actions.guidesDetailPage();
    }

    render() {
        const {container, imageStyle, textStyle, dividerStyle} = styles;
        return (
            <MainLayout>
                <View style={{marginHorizontal: 20}}>
                    {
                        this.props.guides.length !== 0 && this.props.guides.length ?
                            <ScrollView>
                                <View style={{marginVertical: 40}}>
                                    {this.props.guides.map((item, index) => (
                                        <View key={item.id}
                                              style={{marginBottom: index === this.props.guides.length - 1 ? 30 : 0}}>
                                            <TouchableOpacity onPress={this.onNewsPress.bind(this, item.id)}>
                                                <View style={container}>
                                                    <Image source={{uri: this.handleImage(item.image_id)}}
                                                           style={imageStyle}/>
                                                    <Text style={textStyle}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Image
                                                style={[dividerStyle, {display: index === this.props.guides.length - 1 ? 'none' : 'flex'}]}
                                                source={AllImages.divider}/>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                            : <View style={{marginTop: height / 3}}><Loading/></View>
                    }
                </View>
            </MainLayout>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textStyle: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        color: '#898989',
        paddingVertical: 10,
        paddingHorizontal: 30,
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular
    },
    imageStyle: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        backgroundColor: '#898989',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: PHOTO_SIZE / 2
    },
    dividerStyle: {
        width: DIVIDER_WIDTH,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10
    },
    descriptionStyle: {
        fontFamily: IS_RTL ? IranSans.IranSansLight : RobotoFont.RobotoRegular,
        fontSize: 14,
        flexWrap: 'wrap',
        padding: 10,
        backgroundColor: '#f3fff6',
        marginBottom: 10
    }
};


const mapActionToProps = (dispatch) => (
    {
        getGuides: () => dispatch(getGuides()),
        getGuidesByID: (id) => dispatch(getGuidesByID(id))
    }
);
const mapStateToProps = ({iac}) => {
    const {guides} = iac;
    return {guides};
};

export default connect(mapStateToProps, mapActionToProps)(NewsPage);
