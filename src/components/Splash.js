import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Actions } from 'react-native-router-flux';
import Layout from '../layout/LayoutCenter';
import * as functions from '../helper/functions';
import DropdownAlert from 'react-native-dropdownalert';
import {DropDownHolder} from '../helper/dropDownHolder';
import {width} from "../assets/js/variable";
import {connect} from 'react-redux';
import {language} from "../store/actions";

const SPLASH_SIZE = width / 3;
let showing = false;

functions.retrieveData('@LOCATION_INFO').then((res) => {
    const LOCATION_INFO = res;
    if (LOCATION_INFO !== undefined) {
        showing = functions.isObjEmpty(LOCATION_INFO);
        return;
    }
    showing = true;
});

class SplashScreen extends Component {
    state = {
        isConnected: false,
        show: true
    };

    componentWillMount() {
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                this.setState({isConnected: true});
                this.props.language();
            } else {
                this.setState({isConnected: false});
                DropDownHolder.alert('error', 'Error', 'No Internet');
            }
        });
    }
    componentWillReceiveProps(nextProps, nextContext) {
        const condition = nextProps.languagesRes !== this.props.languagesRes && nextProps.languagesRes === false;
        if (this.state.isConnected) {
            if (condition) {
                !showing ? Actions.replace('tabbar') : Actions.replace('introSlider');
            } else {
                this.setState({show: false});
                DropDownHolder.alert('error', 'Error', 'NetWork Error');
            }
        }
    }

    refreshSplash = () => {
        this.props.language();
    };

    render() {
        return (
            <Layout key='splash' colors={['#33d0db', '#3b5998']} showFooter={false}>
                <View style={styles.imageContentStyle}>
                    {
                        this.state.show ?
                            <Image
                                style={styles.splashStyles}
                                source={require('../assets/img/logo.png')}
                            /> :
                            <View style={{textAlign: 'center'}}>
                                <TouchableOpacity onPress={this.refreshSplash()}><Text
                                    style={{color: '#fff', fontSize: 20}}>Refresh</Text></TouchableOpacity>
                            </View>
                    }
                </View>
                <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)}/>
            </Layout>
        );
    }
}

const styles = {
    imageContentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashStyles: {
        width: SPLASH_SIZE,
        height: SPLASH_SIZE,
        resizeMode: 'contain'
    }
};

const mapActionToProps = (dispatch) => (
    {
        language: () => dispatch(language())
    }
);

const mapStateToProps = ({iac}) => {
    const {languagesRes, languages} = iac;
    return {languagesRes, languages}
};
export default connect(mapStateToProps, mapActionToProps)(SplashScreen);
