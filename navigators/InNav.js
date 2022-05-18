import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

const InNav = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
);

export default InNav;