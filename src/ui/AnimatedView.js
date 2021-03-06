import React from 'react';
import { View, TouchableWithoutFeedback, Animated } from 'react-native';

export const AnimatedView = ({ onPress, children, style }) => {
    const state = {
        animatePress: new Animated.Value(1)
    }

    const animateIn = () => {
        Animated.timing(state.animatePress, {
            toValue: 0.9,
            duration: 150,
            useNativeDriver: true
        }).start();
    }

    const animateOut = () => {
        Animated.timing(state.animatePress, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start();
    }

    return (
        <TouchableWithoutFeedback
            onPressIn={animateIn}
            onPressOut={animateOut}
            onPress={onPress}
            style={style}
        >
            <Animated.View
                style={{
                    marginHorizontal: 10,
                    transform: [
                        {
                            scale: state.animatePress
                        }
                    ]
                }}
            >
                <View>
                    {children}
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}