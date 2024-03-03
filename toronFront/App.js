import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import BestScreen from './screens/BestScreen';
import HomeScreen from './screens/HomeScreen';
import AgreeMain from './screens/AgreeMain';
import AlertScreen from './screens/alert';
import StartScreen from './screens/startIndex';
import MypageScreen from './screens/mypage';
import LoginWeb from './components/Start/loginWeb';
import PretoronScreen from './screens/PretoronScreen';
import { Provider } from 'react-redux';
import store from './modules/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator(); 

export default function App() {
  const [data, setData] = useState('');

  const onPressMenu = (navigation) => {
    navigation && navigation.navigate('MyPage');
  };

  const onPressNotifications = (navigation) => {
    navigation && navigation.navigate('Alert');
  };



  return (
    
    <NavigationContainer>
      {/* 상태(state)를 store에 두고 사용하기 위해 태그로 하나 더 감쌌습니다 - 하경 */}
  <Provider store={store}>  
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} 
                    options={{
                      headerLeft: ({ navigation }) => (
                        <TouchableOpacity onPress={() => navigation && navigation.navigate('My Page')}>

                          <Text><Ionicons name="menu" size={30} /></Text>
                        </TouchableOpacity>
                        //toggle로 열리게 하려다가 망한 코드입니다
                      ),
                      headerRight: ({ navigation }) => (


                        <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
                          <Text><Ionicons name="notifications" size={25} /></Text>
                        </TouchableOpacity>
                        // 이것도 이상하게 화면이 안 넘어가네요?
                      ),
                    }}
        />
      <Stack.Screen name="Alert" component={AlertScreen} />
      <Stack.Screen name="My Page" component={MypageScreen} />
      <Stack.Screen name="Board" component={AgreeMain} />
      <Stack.Screen name="Best" component={BestScreen} />
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Pretoron" component={PretoronScreen} />

    </Stack.Navigator>
    </Provider>
  </NavigationContainer> 
  
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={StartScreen} />
    //     <Stack.Screen name="Web" component={LoginWeb} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    //   <Stack.Navigator>
    //     {/* <Stack.Screen name="Home" component={StartScreen} />
    //     <Stack.Screen name="Web" component={LoginWeb} /> */}
    //     <Stack.Screen name="home" component={HomeScreen} />
    //     <Stack.Screen name="Pretoron" component={PretoronScreen}/>
    //   </Stack.Navigator>
    // </NavigationContainer>

  );
};