import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
    flex: 0.3;
    justify-content: center;    
    align-items: center;
    background-color: grey;
    border-radius: 10px;
    padding: 15px;
`;

const CoinName = styled.Text`
    color: white;
    text-align: center;
`;

const CoinIcon = styled.Image`
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 20px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Coin = ({ index, id, symbol }) => {
    const navigation = useNavigation();
    const opacity = useRef(new Animated.Value(0)).current;
    
    const scale = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1]
    });

    useEffect(() => {
        Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: true,
            delay: index * 100
        }).start();
    }, []);

    return (
        <AnimatedContainer 
            onPress={
                () => navigation.navigate("Detail", { id, symbol })
            }
            style={{
                opacity: opacity,
                transform: [{scale}]
            }}
        >
            <CoinIcon source={{ uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}` }}/>
            <CoinName>{symbol}</CoinName>
        </AnimatedContainer>
    );
};

export default Coin;