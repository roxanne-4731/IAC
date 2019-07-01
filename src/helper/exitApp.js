import {BackHandler, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

const handleAndroidBackButton = callback => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        callback();
        return true;
    });
};

const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {
    });
};

const exitAlert = () => {
    if (Actions.currentScene === '_mainPage') {
        Alert.alert(
            'Exit',
            'Are you sure ? ',
            [
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
                {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
            ],
            {cancelable: false},
        );
        return;
    }
    Actions.pop();

};
const backOptions = () => {
    Actions.pop();
};

export {handleAndroidBackButton, removeAndroidBackButtonHandler, exitAlert, backOptions};
