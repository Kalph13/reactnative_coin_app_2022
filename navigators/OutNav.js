import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Join from "../screens/Join";
import { BLACK_COLOR } from "../components/colors";

const Stack = createNativeStackNavigator();

const OutNav = () => (
    <Stack.Navigator
        screenOptions={{
            presentation: "modal",
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: BLACK_COLOR,
            },
        }}
    >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Join" component={Join} />
    </Stack.Navigator>
);

export default OutNav;