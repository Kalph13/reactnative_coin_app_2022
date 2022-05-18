import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../components/colors";

import auth from '@react-native-firebase/auth';
import { Alert, ActivityIndicator } from "react-native";

const Container = styled.View`
    background-color: ${BLACK_COLOR};
    flex: 1;
    align-items: center;
    color: white;
    padding: 60px 20px;
`;

const EmailInput = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
`;

const PasswordInput = styled.TextInput`
    width: 100%;
    padding: 10px 20px;
    border-radius: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: white;
    background-color: rgba(255, 255, 255, 0.5);
`;

const Button = styled.TouchableOpacity`
    width: 100%;
    padding: 10px 20px;
    border-width: 1px;
    border-radius: 20px;
    border-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;


const Join = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const passwordInput = useRef();

    const onSubmitEmailEditing = () => {
        passwordInput.current.focus();
    };

    const onSubmitPasswordEditing = async () => {
        if (email === "" | password === "") {
            return Alert.alert("Fill in the Form");
        }
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            /* Firebase: Create Account */
            await auth().createUserWithEmailAndPassword(email, password);
        } catch(e) {
            switch(e.code) {
                case "auth/weak-password": Alert.alert("Write a Stronger Password.");
                case "auth/email-already-in-use": Alert.alert("The Email is Already in Use.");
                case "auth/invalid-email": Alert.alert("Invalid Email.");
            }
        }
    };

    return (
        <Container>
            <EmailInput 
                placeholder="Email" 
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                value={email} 
                onChangeText={text => setEmail(text)} 
                onSubmitEditing={onSubmitEmailEditing}
            />
            <PasswordInput 
                ref={passwordInput}
                placeholder="Password" 
                secureTextEntry
                returnKeyType="done"
                value={password} 
                onChangeText={text => setPassword(text)} 
                onSubmitEditing={onSubmitPasswordEditing}
            />
            <Button onPress={onSubmitPasswordEditing}>
                { loading ? 
                    <ActivityIndicator color="#ffffff" /> :
                    <ButtonText>Create Account</ButtonText>
                }
            </Button>
        </Container>
    );
};

export default Join;