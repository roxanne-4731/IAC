import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker, AppState} from 'react-native';
import Notification from './pushNotif';
import PushNotification from 'react-native-push-notification';

export default class App extends Component {
    state = {
        seconds: 0
    };

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange.bind(this));
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange.bind(this));

    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date: new Date(Date.now() + (1000))
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Choose Your notification time in seconds.
                </Text>
                <Picker
                    style={styles.picker}
                    selectedValue={this.state.seconds}
                    onValueChange={(seconds) => this.setState({seconds})}
                >
                    <Picker.Item label="5" value={5}/>
                    <Picker.Item label="10" value={10}/>
                    <Picker.Item label="15" value={15}/>
                </Picker>
                <Notification />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5fcff'
        },
        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10
        },
        instructions: {
            textAlign: 'center',
            color: '#333',
            marginBottom: 5
        },
        picker: {
            width: 100
        }
    }
);
