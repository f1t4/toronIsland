// HomeScreen.js

import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import MyScrollView from '../components/Homepage/MyScrollView';

const HomeScreen = ({ navigation }) => {
  // ScrollView의 참조 및 너비 상태 관리를 위한 상태 변수들
  const scrollViewRef = useRef(null);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  // ScrollView의 너비가 변경될 때 호출되는 콜백 함수
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setScrollViewWidth(width);
  };

  const buttonColors = [
    ['#94D3F7', '#AAE0FF'],
    ['#BEA5F2', '#C5AAFF'],
    ['#F2A3C9', '#FFAAD3'],
    ['#8f8f8f', '#959595'] // Best
  ];

  const additionalTexts = ['어제', '11월 10일', '11월 8일'];
  const buttonTexts = [
    "첫 번째 버튼 텍스트첫 번째 버튼 텍스트첫 번째 버튼 텍스트",
    "두 번째 버튼 텍스트",
    "세 번째 버튼 텍스트",
    "이전 토론 더보기",
  ];

  return (
      <View style={{ flex: 1, padding: 20, backgroundColor: 'white'}}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>토론섬</Text>
        {/* 검색 입력란 */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TextInput
            style={{
              backgroundColor: '#EDEDED',
              paddingLeft: 45, // 아이콘이 들어갈 공간 확보
              paddingBottom: 8,
              paddingTop: 8,
              flex: 1,
              borderRadius: 50,
            }}
            placeholder="Search..."
          />
          <Ionicons name="search" size={20} style={{ position: 'absolute', left: 15, zIndex: 1, color:'gray' }} />
        </View>
      
      <MyScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
        {/* today */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Today</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Board')}
        >
          <View style={{ marginBottom: 15, borderRadius: 10, height: 165, overflow: 'hidden', elevation:1, }}>
            <LinearGradient colors={['#9CF095', '#AAF2A3']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/todayChat.png')} style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
              <Text style={{ color: 'black', textAlign: 'center', position: 'absolute', top: '30%', left: 0, right: 0, marginTop: -10 }}>
                2023년 10월 10일
              </Text>
              <Text style={{
                fontWeight: 'bold',
                fontSize:18,
                color: 'black',
                textAlign: 'center',
                position: 'absolute',
                top: '35%',
                left: 0,
                right: 0,
                marginTop: -10,
                padding:20 }}>
                대한민국의 장애인 복지 정책은 현재 만족스러운 수준인가요?
              </Text>
            </LinearGradient>
          </View>
        </TouchableOpacity>
        

        {/* prev */}
        <View style={{marginBottom: 15}}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',}}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Prev</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Best')}>
            <Text style={{ fontSize: 12, color: 'gray', textAlign: 'right' }}>더보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView //스크롤 가능한 뷰를 나타내는 컴포넌트
          ref={scrollViewRef} //ScrollView에 대한 참조 생성 -> 스크롤 뷰에 접근
          horizontal //스크롤이 수평 방향으로 이동
          showsHorizontalScrollIndicator={false} //수평 스크롤 바를 숨김
          pagingEnabled //페이지 단위로 스크롤
          onLayout={handleLayout} //레이아웃 변경 시 호출할 함수를 지정
        >
          {[1, 2, 3, 4].map((buttonNumber, index) => ( //1에서 4까지의 숫자 배열을 순회하며 각각의 버튼을 생성
            <View key={buttonNumber} style={{ margin: scrollViewWidth * 0 }}> 
              <LinearGradient
                colors={buttonColors[index]}
                style={{
                  borderRadius: 10,
                  height: 130, 
                  overflow: 'hidden',
                  width: scrollViewWidth * 1,
                  justifyContent: 'center', // 세로 중앙 정렬
                  alignItems: 'center', // 가로 중앙 정렬
                  elevation: 1,
                }}
              >
                {/* 터치 가능한 투명한 영역을 생성, 터치 이벤트 발생 시 지정된 화면으로 이동 */}
                {/* <TouchableOpacity onPress={() => navigation.navigate(`Page${buttonNumber}`)}> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('Board')}
                >
                  <Text style={{
                    color: index === 3 ? 'white' : 'black',
                    textAlign: 'center',
                    fontSize: 18,
                    textDecorationLine: index === 3 ? 'underline' : 'none',
                    padding: 20, // 텍스트에 대한 padding
                  }}>
                    {buttonTexts[index]}
                  </Text>
                </TouchableOpacity>
                {index < additionalTexts.length && ( //배열의 길이만큼 버튼에 추가 텍스트를 표시
                  <Text style={{ position: 'absolute', top: 10, left: 10, color: 'black', fontWeight: 'bold' }}>
                    {additionalTexts[index]}
                  </Text>
                )}
              </LinearGradient>
            </View>
          ))}
        </ScrollView>
        </View>

        {/* best */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Best</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Best')}>
            <LinearGradient
              colors={['#FFECA8', '#FFF3C9']}
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 25,
                borderRadius: 10,
                overflow: 'hidden',
                elevation: 1,
              }}
            >
              <Text style={{ color: 'black', textAlign: 'left' }}>👑      베스트 토론</Text>
              <Ionicons name="chevron-forward-outline" size={24} color="black" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </MyScrollView>
    </View>
  );
};

export default HomeScreen;