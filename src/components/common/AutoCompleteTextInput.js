import React, {Component} from 'react';
import {TextInput, FlatList, View, Image, I18nManager, Text} from "react-native";
import {Spinner} from "./index";
import {width, height} from "../../assets/js/variable";
import {RobotoFont} from '../../utils/Fonts';

const IS_RTL = I18nManager.isRTL;
const ICON_SIZE = width / 16;
const INPUT_HEIGHT = height / 15;

export default class AutoComplete extends Component {
    render() {
        const {
            value,
            onChangeText,
            data,
            renderItem,
            textInputStyle,
            flatListStyle,
            containerStyle,
            placeholder,
            icon,
            iconStyle,
            placeholderColor,
            loading,
            locationInputStyle,
            children
        } = this.props;

        const {
            inputStyle,
            inputContainerStyle,
            iconInputStyle,
            container,
            flatList,
            spinnerColor
        } = styles;

        return (
            <View style={[container, containerStyle]}>
                <View style={[inputContainerStyle, locationInputStyle]}>
                    <Image style={[iconInputStyle, iconStyle]} source={icon}/>
                    <TextInput
                        style={[inputStyle, textInputStyle]}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderColor}
                        value={value}
                        onChangeText={onChangeText}
                    />
                    {loading ? <Spinner color={spinnerColor} /> : <View/>}
                </View>
                {children}
                <FlatList
                    keyboardShouldPersistTaps='always'
                    style={[flatList, flatListStyle, {height: data.length === 0 ? 0 : 100}]}
                    data={data}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator
                />
            </View>
        );
    }
}

const styles = {
    container: {
        position: 'relative',
        flexDirection: 'column',
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        color: '#fff',
        fontFamily: RobotoFont.RobotoRegular,
        paddingVertical: 0
    },
    inputContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2761cd',
        borderWidth: 1,
        borderColor: '#1b4fa9',
        padding: 10,
    },
    iconInputStyle: {
        resizeMode: 'contain',
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginRight: 5
    },
    flatList: {
        elevation: 5,
        backgroundColor: '#2761cd',
    }
};
