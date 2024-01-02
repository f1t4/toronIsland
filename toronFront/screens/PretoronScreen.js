import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Animated, Platform } from 'react-native';
import Header from '../components/Pretoron/PretoronHeader.js';
import ToronCard from '../components/Pretoron/PretoronCard.js';
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';

//주제 넣어주는 함수
const fetchTopics = async () => {
  try {
    const response = await axios.get('http://localhost:3001/getTopics');
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
};

const PretoronScreen = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // 페이지 로드 시 주제 데이터 가져오기
    fetchTopicsData();
  }, []);

  const fetchTopicsData = async () => {
    const topicData = await fetchTopics();
    setTopics(topicData);
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
          {topics.map((item) => (
            <ToronCard
              key={item.board_id}
              date={item.board_create}
              title={item.board_content}
              participants={item.participants}
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
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
    height: '100%',
    justifyContent: 'center',
  },
});

export default PretoronScreen;
