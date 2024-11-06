/* eslint-disable @typescript-eslint/no-unused-vars */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '@screens';
import React from 'react';

const AppStack = createNativeStackNavigator();
const AppStackScreens = ({navigation}) => {
  return (
    <AppStack.Navigator initialRouteName={'AppHome'}>
      <AppStack.Screen
        name="AppHome"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
