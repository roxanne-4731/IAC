import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const Button = ({onPress, children, hasIcon}) => {
    const {buttonStyle, textStyles, iconStyle, buttonContainerStyle} = styles;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={buttonContainerStyle}>
                {
                    hasIcon
                    ? <Image
                    style={styles.iconStyle}
                    source={require('../../assets/img/logo.png')} />
                : <Text />
                }
                <Text style={textStyles}>
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    buttonContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        backgroundColor: '#2761cd',
        borderWidth: 1,
        borderColor: '#1b4fa9',
        marginRight: 20,
        marginLeft: 20
    },
    textStyles: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    iconStyle: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
};

export {Button} ;
