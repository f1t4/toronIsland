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

  /* 3000은 데이터를 가져올 내용이 없어서 자꾸 err가 발생해서요.. 
    * 서버에서 데이터 가져올 일 있으면 3000 뒤에 /path 붙여서 필요한 url에 쓰셔용
    * 지금은 일단 주석처리 해두겠습니다 _감
    */
  // useEffect(() => {
  //   // 서버로부터 데이터를 가져오는 예시
  //   axios.get('http://localhost:3000')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);


  return (
  //   <NavigationContainer>
  //   <Stack.Navigator initialRouteName="Home">
  //     <Stack.Screen name="Home" component={HomeScreen} 
  //                   options={{
  //                     headerLeft: ({ navigation }) => (
  //                       <TouchableOpacity onPress={() => navigation && navigation.navigate('My Page')}>

  //                         <Ionicons name="menu" size={30} />
  //                       </TouchableOpacity>
  //                       //toggle로 열리게 하려다가 망한 코드입니다
  //                     ),
  //                     headerRight: ({ navigation }) => (


  //                       <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
  //                         <Ionicons name="notifications" size={25} />
  //                       </TouchableOpacity>
  //                       // 이것도 이상하게 화면이 안 넘어가네요?
  //                     ),
  //                   }}
  //       />
  //     <Stack.Screen name="Alert" component={AlertScreen} />
  //     <Stack.Screen name="My Page" component={MypageScreen} />
  //     <Stack.Screen name="Board" component={AgreeMain} />
  //     <Stack.Screen name="Best" component={BestScreen} />
  //     <Stack.Screen name="Start" component={StartScreen} />
  //   </Stack.Navigator>
  // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="Web" component={LoginWeb} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};