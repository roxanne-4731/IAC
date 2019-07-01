import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({ size, color }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator
                size={size || 'large'}
                color= { color || '#fff'}
            />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        justifyContent: 'center'
    }
};

export {Spinner};
