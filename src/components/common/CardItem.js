import React from 'react';
import { View } from 'react-native';


const CardItem = (props) => {
    return (
        <View style={[styles.containerStyles, props.style]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyles: {
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        borderColor: '#ddd',
        borderBottomWidth: 1
    }
};

export { CardItem };
