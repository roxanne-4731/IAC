import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    I18nManager,
    TouchableOpacity,
    Picker,
    Alert,
    KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux';
import MainLayout from '../layout/MainLayout';
import AllImages from "../assets/img/allImages";
import {getLocation, getLocations, getQiblaDegree, getCalender} from '../store/actions';
import AutoComplete from '../components/common/AutoCompleteTextInput';
import _ from "lodash";
import * as functions from "../helper/functions";
import RNRestart from "react-native-restart";

const BOX_WIDTH = (Dimensions.get('window').width) - 40;
let LOCATION_INFO = {};
const ICON_SIZE = Dimensions.get('window').width / 17;

functions.retrieveData('@LOCATION_INFO').then((res) => {
    LOCATION_INFO = JSON.parse(res);
});

class Setting extends Component {
    state = {
        locations: [],
        inputValue: '',
        loading: false,
        language: ''
    };

    componentWillMount() {
        const {location, language} = LOCATION_INFO;
        if (LOCATION_INFO) {
            this.setState({language: language, inputValue: location})
        }
    }

    SearchLocation = (searchedText) => {
        if (searchedText !== '') {
            this.setState({inputValue: searchedText});
            this.onSearch(searchedText);
        } else {
            this.setState({locations: [], inputValue: ''});
        }
    };

    onSearch = _.debounce((searchedText) => {
        this.onTextChange(searchedText);
    }, 600);

    onTextChange = (searchedText) => {
        this.setState({loading: true});
        this.props.getLocations(searchedText).then((res) => {
            this.setState({loading: false});
            let locations = res.filter(function (location) {
                return location.place_name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
            });
            this.setState({locations});
        }).catch((error) => {
            this.setState({loading: false});
            console.log(error);
        });
    };

    renderData = ({item}) => {
        return (
            <View style={{padding: 20}} keys={item.id}>
                <TouchableOpacity
                    onPress={this._onFlatListPress.bind(this, item)}
                >
                    <Text style={styles.flatListItems}>{item.place_name}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    async _onFlatListPress(item) {
        this.setState({inputValue: item.place_name, locations: []});
        this.props.getLocation(item.place_name);
        const qiblaPoints = item.geometry.coordinates;
        await this.props.getQiblaDegree({lat: qiblaPoints[1], lng: qiblaPoints[0]});
        this.saveLocation(item);
    };

    async saveLocation(item) {
        const location = {
            lat: item.geometry.coordinates[1],
            lng: item.geometry.coordinates[0],
            location: item.place_name,
            qiblaDegree: this.props.qiblaDegree
        };
        await functions.mergeItem('@LOCATION_INFO', JSON.stringify(location));
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        await functions.retrieveData('@LOCATION_INFO').then((res) => {
            const json = JSON.parse(res);
            if (!functions.isObjEmpty(json)) {
                const data = {
                    lat: json.lat,
                    lng: json.lng,
                    year,
                    month,
                    method: 7
                };
                this.props.getCalender(data);
            }
        });
    };

    onPickerChange = (itemValue) => {
        const language = {
            language: itemValue
        };
        functions.mergeItem('@LOCATION_INFO', JSON.stringify(language));
        Alert.alert(
            'Language',
            'Are you sure ? ',
            [
                {text: 'Yes, I am', onPress: this.changeLanguage.bind(this, itemValue)},
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            {cancelable: false},
        );
    };

    changeLanguage(value) {
        if (value === 'IR' || value === 'SA') {
            I18nManager.forceRTL(true);
        } else {
            I18nManager.forceRTL(false);
        }
        RNRestart.Restart();
    };

    render() {
        const {
            locationInputStyle,
            flatListStyle,
            locationTextStyle,
            dividerStyle,
            pickerStyle,
            iconLocationStyle
        } = styles;
        return (
            <MainLayout>
                <KeyboardAvoidingView style={{
                    marginHorizontal: 20,
                    paddingTop: 20,
                }}>
                    <AutoComplete
                        placeholder="Type Your Location"
                        icon={AllImages.blueLocation}
                        onChangeText={this.SearchLocation}
                        value={this.state.inputValue}
                        data={this.state.locations}
                        renderItem={this.renderData}
                        placeholderColor="#33d0db"
                        loading={this.state.loading}
                        iconStyle={iconLocationStyle}
                        locationInputStyle={locationInputStyle}
                        textInputStyle={locationTextStyle}
                        flatListStyle={flatListStyle}>
                        <Image style={dividerStyle} source={AllImages.divider}/>
                    </AutoComplete>
                    <View style={{marginTop: 5}}>
                        <Picker
                            selectedValue={this.state.language}
                            style={pickerStyle}
                            onValueChange={this.onPickerChange}>
                            <Picker.Item label="Swedish" value="SE"/>
                            <Picker.Item label="Persian" value="IR"/>
                            {/*<Picker.Item label="Arabic" value="SA"/>*/}
                        </Picker>
                    </View>
                    <Image style={dividerStyle} source={AllImages.divider}/>
                </KeyboardAvoidingView>
            </MainLayout>
        );
    }
}

const styles = {
    locationInputStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    locationTextStyle: {
        color: '#33d0db',
        fontSize: 18
    },
    flatListStyle: {
        color: '#fff',
        backgroundColor: '#fff',
        marginBottom: 0
    },
    dividerStyle: {
        width: BOX_WIDTH,
        resizeMode: 'contain'
    },
    containerStyle: {
        position: 'relative',
        backgroundColor: 'red',
        marginBottom: 0
    },
    pickerStyle: {
        height: 50,
        width: null,
        color: '#33d0db'
    },
    iconLocationStyle: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginTop: ICON_SIZE / 2,
    }
};

const mapStateToProps = ({app}) => {
    const {location, language, qiblaDegree} = app;
    return {location, language, qiblaDegree}
};

const mapActionToProps = (dispatch) => (
    {
        getLocations: (location) => dispatch(getLocations(location)),
        getLocation: (location) => dispatch(getLocation(location)),
        getQiblaDegree: ({lat, lng}) => dispatch(getQiblaDegree({lat, lng})),
        getCalender: (date) => dispatch(getCalender(date))
    }
);

export default connect(mapStateToProps, mapActionToProps)(Setting);
