import React from "react";
import styled from "styled-components/native";
import { BLACK_COLOR } from "../components/colors";

const Container = styled.View`
    background-color: ${BLACK_COLOR};
    flex: 1;
    color: white;
`;

const Wrapper = styled.View`
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ContainerText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: white;
`;

const Button = styled.TouchableOpacity``;

const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`;

const Login = ({ navigation: { navigate } }) => {
    return (
        <Container>
            <Wrapper>
                <ContainerText>Don't have an account? </ContainerText>
                <Button onPress={() => navigate("Join")}>
                        <ButtonText>Join &rarr;</ButtonText>
                </Button>
            </Wrapper>
        </Container>
    );
};

export default Login;