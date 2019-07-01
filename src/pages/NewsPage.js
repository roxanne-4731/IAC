import React, {Component} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, I18nManager} from 'react-native';
import {Actions} from 'react-native-router-flux';
import MainLayout from '../layout/MainLayout';
import AllImages from '../assets/img/allImages';
import {getNewsById, getNews} from "../store/actions";
import {connect} from 'react-redux';
import {IranSans, RobotoFont} from "../utils/Fonts";
import Loading from '../components/Loading';
import * as functions from "../helper/functions";
import {height, width} from "../assets/js/variable";

const DIVIDER_WIDTH = width / 1.5;
const PHOTO_SIZE = width / 5 + 10;
const IS_RTL = I18nManager.isRTL;

class NewsPage extends Component {
    state = {
        show: false
    };

    componentWillMount() {
        setTimeout(() => {
            this.props.getNews();
            this.setState({show: true})
        }, 500)
    }

    handleImage = (id) => {
        return functions.getImage(id);
    };

    onNewsPress(id) {
        this.props.getNewsByID(id);
        Actions.newsDetailPage();
    }


    render() {
        const {container, imageStyle, textStyle, dividerStyle} = styles;
        return (
            <MainLayout>
                {
                    this.state.show ? <View>
                        {
                            this.props.news.length !== 0 ? <ScrollView>
                                <View style={{marginVertical: 50}}>
                                    {this.props.news.map((item, index) => (
                                        <View key={item.id}>
                                            <TouchableOpacity onPress={this.onNewsPress.bind(this, item.id)}>
                                                <View style={container}>
                                                    {
                                                        item.image_id ?
                                                            <Image source={{uri: this.handleImage(item.image_id)}}
                                                                   style={imageStyle}/> :
                                                            <Image source={AllImages.logo}
                                                                   style={imageStyle}/>
                                                    }

                                                    <Text style={textStyle}>{item.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Image
                                                style={[dividerStyle, {display: index === this.props.news.length - 1 ? 'none' : 'flex'}]}
                                                source={AllImages.divider}/>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView> : <View style={{marginTop: height / 3}}><Loading/></View>
                        }
                    </View> : <Loading/>
                }

            </MainLayout>
        );
    }
};
const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20
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
        resizeMode: 'stretch'
    },
    dividerStyle: {
        width: DIVIDER_WIDTH,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10
    }
};

const mapStateToProps = ({iac}) => {
    const {news} = iac;
    return {news}
};

const mapActionToProps = (dispatch) => (
    {
        getNewsByID: (id) => dispatch(getNewsById(id)),
        getNews: () => dispatch(getNews()),

    }
);

export default connect(mapStateToProps, mapActionToProps)(NewsPage);
