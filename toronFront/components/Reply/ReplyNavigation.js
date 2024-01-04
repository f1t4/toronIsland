import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllScreen from './ReplyAll';
import AgreeScreen from './ReplyAgree';
import DisagreeScreen from "./ReplyDisagree";

const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
    // tabNavigator: {
    //   paddingTop: 20, // 상단 여백 추가
    // },
    tabBar: {
      backgroundColor: '#fff', // 상단바의 배경색
      height: 60, // 상단바의 높이
      elevation: 0, //그림자 없애기
    },
    tabItem: {
      backgroundColor: '#fff', // 각 탭의 배경색
      margin: 2,
      // borderRadius : 10,
      elevation: 0, // 그림자를 없애는 부분
    },
    indicator: {
        fontWeight : 'bold',
        backgroundColor: '#000000', // 아래 선의 배경색
      },
    tabText : {
        fontSize : 18,
        fontWeight : 'bold'
    }
  });


function TopTabsGroup() {
  return(

    <Tab.Navigator style={styles.tabNavigator}

        tabBarOptions={{
            style: styles.tabBar,
            tabStyle: styles.tabItem,
            indicatorStyle: styles.indicator,
        }}
        screenOptions={({ route }) => ({
            tabBarStyle: styles.tabItem, // 각 탭의 스타일
            tabBarLabelStyle: styles.tabText, // 탭 안의 텍스트 스타일
          })}

    >
      <Tab.Screen name='전체' component={AllScreen}/>
      <Tab.Screen name='찬성' component={AgreeScreen}/>
      <Tab.Screen name='반대' component={DisagreeScreen}/>
  
    </Tab.Navigator>
  );
}



export default function Navigation() {
    return (
        <NavigationContainer>
            <TopTabsGroup/>
        </NavigationContainer>
    );
}