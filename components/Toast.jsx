import React, {forwardRef, useEffect} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import shadowGenerator from "../../helpers/shadowGenerator";
import useThemeStyles from "../../hooks/useThemeStyles";
import Constants from "expo-constants";
import {useDispatch, useSelector} from "react-redux";
import {getTranslated} from "../../helpers/functions";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import Actions from "../../redux/Actions";

const toastContainerHeight = 150;

export const Toast = forwardRef((props, ref) => {
    const statusBarHeight = Constants.statusBarHeight;
    const animationValue = toastContainerHeight + statusBarHeight;
    const offset = useSharedValue(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!!toast)
            showToast()
    },[toast]);

    const showToast = () => {
        offset.value = withSequence(
            withSpring(animationValue),
            withDelay(6000, withSpring(-animationValue, {}, (finished) => {
                if (finished)
                    runOnJS(cleanup)();
            })));
    };

    const cleanup = () => dispatch(Actions.Toasts.Cleanup());

    const defaultStyles = useAnimatedStyle(() => ({
        transform: [{translateY: withSpring(offset.value - animationValue, {
            damping: 20,
            stiffness: 120,
            mass: 1
        })}],
    }));

    return(
        <Animated.View
            style={[
                styles.toastContainer,
                defaultStyles,
                {
                    height: animationValue
                },
            ]}
        >
            <TouchableOpacity
                style={[
                    styles.toast,
                    {
                        backgroundColor: theme.main_bg,
                        borderWidth: 5,
                        borderColor: !!toast ? toast?.color : props?.toastColor || theme.main_bg
                    }
                ]}
                onPress={() => {
                    (offset.value = -animationValue)
                    cleanup()
                }}
            >
                <View style={{flex:1}}>
                    <Text style={{
                        textAlign: 'center',
                        color: theme.dark_text
                    }}>
                        {getTranslated(toast?.message || props.message, locale)}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    )
});

const styles = {
    toastContainer: {
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
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        borderRadius: 10,
        ...shadowGenerator(10)
    },
    toastElement: {
        height: 25,
        width: 25,
        borderRadius: 50,
        marginRight: 15,
    }
};
