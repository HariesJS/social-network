import React from 'react';
import { StyleSheet, View } from 'react-native';

export const HRLine = () => {
    return <View style={styles.hr} />
}

const styles = StyleSheet.create({
    hr: {
        backgroundColor: '#fff',
        width: '100%',
        height: 1
    }
})