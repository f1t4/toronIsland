// ProfileSelectionScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";



const ProfileSelectionScreen = () => {
  const [userProfileNumber, setUserProfileNumber] = useState(null);
  const navigation = useNavigation();

  const imagePaths = [
    require('../assets/1.jpg'),
    require('../assets/2.jpg'),
    require('../assets/3.jpg'),
    require('../assets/4.jpg'),
    require('../assets/5.jpg'),
    require('../assets/6.jpg'),
  ];

  const handleProfileSelection = async (selectedNumber) => {
    const email = 'qwer@gmail.com'; // 실제 사용자 이메일로 교체
  
    // 사용자가 이미 존재하는지 확인
    const loginResponse = await fetch('http://192.168.0.15:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  
    const loginResult = await loginResponse.json();
  
    if (loginResult.shouldSelectProfile) {
      // 사용자가 존재하지 않으면 프로필 선택 화면으로 이동
      // 프로필 선택 정보를 서버에 전송
      const selectProfileResponse = await fetch('http://192.168.0.15:3001/selectProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          profileNumber: selectedNumber,
        }),
      });
  
      const selectProfileResult = await selectProfileResponse.json();
  
      if (selectProfileResult.success) {
        // 프로필 선택이 성공했을 때의 동작
        navigation.navigate('home');
      } else {
        // 실패 시의 동작
        // 로그인 하라는 컴포넌트 띄우기 등의 처리
      }
    } else {
      // 사용자가 이미 존재하면 홈 화면으로 바로 이동
      navigation.navigate('home');
    }
  };
  

  const renderProfileItem = ({ item }) => (
    <TouchableOpacity
      key={item}
      style={styles.profileItem}
      onPress={() => handleProfileSelection(item)}
    >
      <Image source={imagePaths[item - 1]} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[
        'rgba(253, 200, 209, 0.2)',
        'rgba(207, 186, 253, 0.2)',
        'rgba(168, 241, 161, 0.2)',
        'rgba(194, 244, 252, 0.2)',
      ]}
      start={{ x: 0.05, y: 0.1286 }}
      end={{ x: 0.5, y: 0.5 }}
      style={styles.container}
    >

      <View style={styles.header}>
        <Text style={{fontSize: 27, fontWeight:'400'}}>프로필 사진 설정</Text>
        <Text style={{fontSize: 16, color:'gray', marginTop:6}}>원하는 프로필 사진을 선택해주세요</Text>
      </View>

      <FlatList
        data={[1,2,3,4,5,6]}
        renderItem={renderProfileItem}
        keyExtractor={(number) => number.toString()}
        numColumns={3}
        contentContainerStyle={styles.imageBox}

      />

      <TouchableOpacity style={styles.submitButton}  onPress={() => handleProfileSelection(userProfileNumber)}>
        <Text style={{fontSize : 22}}>선택완료</Text>
      </TouchableOpacity>


    </LinearGradient>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
  },
  header: {
    flex : 0.2,
    // backgroundColor: '#fff',
    padding: 10,
    marginLeft : 15
  },
  imageBox:{
    flex : 2,
    alignItems: 'center',
    // backgroundColor : 'pink'
  },
  profileItem: {
    // flex :1,
    margin: 10,
    // backgroundColor: '#e0e0e0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width : 100,
    height : 100,
    borderRadius: 50,
  },
  submitButton: {
    flex : 0.12,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom : 50,
    marginHorizontal : 40,
    
    elevation: 3
  },
});

export default ProfileSelectionScreen;