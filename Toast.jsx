import React, {forwardRef, useEffect, useRef} from "react";
import {Animated, Easing, Text, TouchableOpacity, View} from "react-native";

export default function Toast({statusBarHeight, show, animationType, toastOnPress, style, children, showingDuration, withClose, onHide}) {
    const toastContainerHeight = 150;
    const animationValue = toastContainerHeight + statusBarHeight || 180;
    const animatedValue = useRef(new Animated.Value(-animationValue)).current;

    useEffect(() => {
        if (!!children && show)
            showToast()
    },[children, show]);

    const showToast = () => {
        const animation =  {easing: animationType === 'bounce' ? Easing.bounce : animationType === 'elastic' ? Easing.elastic(1.7) : null}

        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 550,
            ...animation,
            useNativeDriver: true
        }).start(() => hideToast());
    }

    const hideToast = () => {
        setTimeout(() => {
            Animated.timing(animatedValue, {
                toValue: -animationValue,
                duration: 550,
                useNativeDriver: true
            }).start(() => onHide());
        },showingDuration || 8000);
    }

    return(
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    height: animationValue,
                    transform: [{
                        translateY: animatedValue
                    }],
                }
            ]}
        >
            <TouchableOpacity
                style={[
                    style?.toast || styles.toast,
                ]}
                onPress={() => {
                    !!toastOnPress && toastOnPress()

                    if (withClose) {
                        Animated.timing(animatedValue, {
                            toValue: -animationValue,
                            duration: 550,
                            useNativeDriver: true
                        }).start();
                    }
                }}
            >
                {children}
            </TouchableOpacity>
        </Animated.View>
    )
};

const styles = {
    toastContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 99,
        top: -60,
        left:0,
        right:0,
        alignItems: 'flex-end',
        justifyContent:  'flex-end'
    },
    toast: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    toastElement: {
        height: 25,
        width: 25,
        borderRadius: 50,
        marginRight: 15,
    }
};
