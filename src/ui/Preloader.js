import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export const Preloader = ({ color, size = 'large', style }) => (
    <View style={{ ...styles.loader, ...style }}>
        <ActivityIndicator
            color={color}
            size={size}
        />
    </View>
)

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})