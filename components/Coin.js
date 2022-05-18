import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
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

const Coin = ({ input }) => {
    const opacity = useRef(new Animated.Value(0)).current;
    
    const scale = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1]
    });

    useEffect(() => {
        Animated.spring(opacity, {
            toValue: 1,
            useNativeDriver: true,
            delay: input.index * 100
        }).start();
    }, []);

    return (
        <AnimatedContainer style={{
            opacity: opacity,
            transform: [{scale}]
        }}>
            <CoinIcon source={{ uri: `https://coinicons-api.vercel.app/api/icon/${input.item.symbol.toLowerCase()}` }}/>
            <CoinName>{input.item.symbol}</CoinName>
        </AnimatedContainer>
    );
};

export default Coin;