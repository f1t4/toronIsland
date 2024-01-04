import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from '../components/Reply/ReplyNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackBtn from '../components/Reply/BackBtn';
import { getStatusBarHeight } from "react-native-iphone-x-helper";


// statusBar의 높이 측정해서 paddigTop값을 주려고 함(아이폰x이후 모델에서 적용하기 위함)
const statusBarHeight = getStatusBarHeight(true);

export default function App() {
  return (
    <SafeAreaView style={{flex:1, paddingTop: statusBarHeight}} edges={['rigth', 'left']}>
     <View style={styles.container}>

        <View style={styles.BackBtn}>
          <BackBtn/>
        </View>

        <View style={styles.title}>
          <Text style={{left : 30 ,fontSize : 24}}>댓글 단 글</Text>
        </View>
      </View>

      <View style={styles.NavContainer}>
        <Navigation />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BackBtn: {
    flex: 0.8,
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'skyblue',
  },
  NavContainer: {
    flex: 7,
    // backgroundColor: 'tomato',
  },

});