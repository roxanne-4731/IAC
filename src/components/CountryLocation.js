import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
} from 'react-native';
import {connect} from 'react-redux';
import AllImages from '../assets/img/allImages';
import CountryPicker from 'react-native-country-picker-modal';
import {getLanguage} from "../store/actions";
import {RobotoFont} from '../utils/Fonts';
import {height, width} from "../assets/js/variable";

const COUNTRIES = ['IR', 'SE'];
const NAMES = {
    'Iran': 'Persian',
    'Saudi Arabia': 'Arabic',
    'Sweden': 'Swedish',
    'Test': 'Select Language'
};
const ANDROID_MINUS_HEIGHT = 24;
const ANDROID_NAV_BAR_HEIGHT = 52;
const getHeight = () => (Platform.OS === 'android' ? height - ANDROID_MINUS_HEIGHT - ANDROID_NAV_BAR_HEIGHT : height);
export const getWidthPercent = (percentage) => (width * percentage) / 100;
export const getHeightPercent = (percentage) => (getHeight() * percentage) / 100;
const ICON_SIZE = width / 30 ;


class LanguagePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cca2: 'SE',
            country: {cca2: '', currency: '', callingCode: '', name: 'Test'}
        };
    }

    onCountryChange = (value) => {
        this.setState({country: value, cca2: value.cca2});
        this.props.getLanguage(value.cca2);
    };
    renderFilter = ({value, onChange, onClose}) => {
        return (
            <View style={styles.selectorArrow}>
                <View style={styles.itemCountry}>
                    <View style={styles.itemCountryFlag}/>
                    <Text style={styles.itemCountryName}>Persian</Text>
                </View>
                <View style={styles.itemCountry}>
                    <View style={styles.itemCountryFlag}/>
                    <Text style={styles.itemCountryName}>Persian</Text>
                </View>
                <View style={styles.itemCountry}>
                    <View style={styles.itemCountryFlag}/>
                    <Text style={styles.itemCountryName}>Persian</Text>
                </View>
            </View>
        )
    };

    render() {
        const { container, instructions, arrowDown } = styles;
        const { containerStyle, instructionsStyle, arrowDownStyle } = this.props;
        return (
            <View style={[container, containerStyle]}>
                <Text style={[instructions, instructionsStyle]}>
                    {NAMES[this.state.country.name]}
                </Text>
                <Image style={[arrowDown, arrowDownStyle]} source={AllImages.arrowDown}/>
                <CountryPicker
                    countryList={COUNTRIES}
                    hideAlphabetFilter
                    onChange={this.onCountryChange}
                    cca2={this.state.cca2}
                    translation='eng'
                    transparent
                    styles={countryPicker}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
    },
    instructions: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888',
        position: 'absolute',
        left: 15,
        fontFamily: RobotoFont.RobotoRegular,
    },
    arrowDown: {
        position: 'absolute',
        resizeMode: 'contain',
        width: ICON_SIZE,
        right: 10,
    },
    itemCountry: {
        flexDirection: 'row',
        height: 52,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#f3f4f5',
    },
    itemCountryName: {
        justifyContent: 'center',
        width: getWidthPercent(70),
        height: getHeightPercent(7),
    },
    itemCountryFlag: {
        justifyContent: 'center',
        alignItems: 'center',
        height: getHeightPercent(7),
        width: getWidthPercent(15),
    },
    selectorArrow: {
        marginTop: 100
    },
});


const countryPicker = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 15
    },
    touchFlag: {
        borderColor: '#000',
        alignItems: 'flex-end',
        height: 20
    },
    imgStyle: {
        width: 30,
        height: 25,
    },
    countryName: {}
});

const mapActionToProps = (dispatch) => (
    {
        getLanguage: (language) => dispatch(getLanguage(language))
    }
);

export default connect(null, mapActionToProps)(LanguagePicker);
