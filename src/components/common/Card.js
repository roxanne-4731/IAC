import React, {Component} from 'react';
import {View} from 'react-native';

class Card extends Component {
    render() {
        return (
            <View style={styles.containerStyles}>
                {this.props.children}
            </View>
        );
    }
}

const styles = {
    containerStyles: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        elevation: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 10
    }
};

export {Card} ;