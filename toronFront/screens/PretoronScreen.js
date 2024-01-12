import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Animated, Platform } from 'react-native';
import Header from '../components/Pretoron/PretoronHeader.js';
import ToronCard from '../components/Pretoron/PretoronCard.js';
import { LinearGradient } from "expo-linear-gradient";
import ReadTopics from '../data/readTopics.js';
import SearchBar from '../components/Search.js';
import { useRoute } from '@react-navigation/native';

//주제 넣어주는 함수

const PretoronScreen = () => {
  // const [topics, setTopics] = useState([]);
  const[posts, setPosts] = useState([]);
  
  const route = useRoute();
  console.log('Route Params:', route.params);
  
  const searchQuery = route.params?.searchQuery || ''; 
  //searchquery변수에 현재 화면으로 전달된 매개변수 가져온다, route.parms객체가 존재하면 해당 매개변수를 가져오고, 존재하지 않으면 빈 문자열 할당

  useEffect(() => {
    // 페이지 로드시, 검색 쿼리를 기반으로 주제 데이터 가져오기
    fetchPostsData(searchQuery);
  }, [searchQuery]);

  const fetchPostsData = async (query) => {
    try {
      const response = await fetch(`http://172.30.1.100:3000/board_data?query=${query}`);
      const data = await response.json();
      
      // console.log('서버 응답:', response);

      setPosts(data);
      console.log(data);
      console.log(data[0].board_content);
    } catch (error) {
      console.log('게시물 가져오기 에러', error.message);
    }
  };

  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [100, 10],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -30],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerTextSize = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [24, 18],
    extrapolate: 'clamp',
  });

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
      style={styles.gradientBackground}
    >
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.headerContainer,
            { height: headerHeight },
          ]}
        >
          <Animated.View
            style={[
              styles.header,
              { transform: [{ translateY: headerTranslateY }], opacity: headerOpacity },
            ]}
            >
            <SearchBar/>
            <Header
              headerText={"이전 토론 👑"}
              style={{ fontSize: headerTextSize }}
              />
          </Animated.View>
        </Animated.View>
        <ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
        >
          {posts.map((item, index) => (
            <ToronCard
            key={index} // 임의로 index를 key로 사용
            title={item.board_content} // 주제 데이터에서 board_content를 가져와서 title로 사용
          />
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
    flexDirection: 'column',
  },
  headerContainer: {
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom : 20,
    marginTop:10
    // backgroundColor:'tomato'
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
    flex:1,
    justifyContent: 'center',
  },

});

export default PretoronScreen;