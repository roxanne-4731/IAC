import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {Text, TouchableWithoutFeedback, View, Keyboard} from "react-native";
import AutoComplete from "./common/AutoCompleteTextInput";
import AllImages from "../assets/img/allImages";
import {getLocations, getLocation, getQiblaDegree} from "../store/actions";
import {RobotoFont} from "../utils/Fonts";

class GetLocation extends Component {
    state = {
        locations: [],
        inputValue: '',
        loading: false
    };

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
            this.props.updateData(true);
            this.setState({locations});
        }).catch((error) => {
            this.setState({loading: false});
            this.props.updateData(false);
            console.log('error in auto Complete ---- ', error);
        });
    };
    renderData = ({item}) => {
        return (
            <View style={{padding: 20}} keys={item.id}>
                <TouchableWithoutFeedback
                    onPress={this._onFlatListPress.bind(this, item)}
                >
                    <Text style={styles.flatListItems}>{item.place_name}</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    };

    _onFlatListPress(item) {
        this.setState({inputValue: item.text_en, locations: []});
        this.props.getLocation(item.text_en);
        const qiblaPoints = item.geometry.coordinates;
        this.props.getQiblaDegree({lat: qiblaPoints[1], lng: qiblaPoints[0]});
        Keyboard.dismiss();
    };

    render() {
        return (
            <View>
                <AutoComplete
                    placeholder="Type Your Location"
                    icon={AllImages.location}
                    onChangeText={this.SearchLocation}
                    value={this.state.inputValue}
                    data={this.state.locations}
                    renderItem={this.renderData}
                    placeholderColor="#fff"
                    loading={this.state.loading}
                />
            </View>
        );
    }
}

const mapActionToProps = (dispatch) => (
    {
        getLocations: (location) => dispatch(getLocations(location)),
        getLocation: (location) => dispatch(getLocation(location)),
        getQiblaDegree: ({lat, lng}) => dispatch(getQiblaDegree({lat, lng}))
    }
);
const styles = {
    flatListItems: {
        flex: 1,
        flexWrap: 'wrap',
        fontSize: 14,
        color: '#fff',
        fontFamily: RobotoFont.RobotoRegular
    }
};
export default connect(null, mapActionToProps)(GetLocation);
