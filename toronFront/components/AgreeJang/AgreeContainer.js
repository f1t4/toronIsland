import React from "react";
import { FlatList, StyleSheet, Text, View, StatusBar, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { addPost } from "../../modules/actions";

// 0312 다음에 해야 할 거... posts의 board_content 내용 화면에 보이게 하기 



const styles = StyleSheet.create({
  vsText:{
      fontSize: 12,
      color: 'black',
      fontWeight: '700',
      // backgroundColor:'red',
  },
  container: {
      // flex: 1,
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    hapBox: {
      backgroundColor: '#EFEFEF',
      width: 90,
      padding: 3,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 12,
      marginTop: 5,
    },
    hap:{
      fontSize: 10
    },
    goRight: {
      alignItems: 'flex-end'
    },
    textBox:{
      marginTop: 10,
      marginBottom: 3,
      padding: 20,
      height: "100%",
      // backgroundColor: 'pink',
      // flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    text:{
      fontSize: 14,
      color: 'black',
      fontWeight: '700',
      // marginLeft: '20%',
      // backgroundColor: 'blue'
    },
    vs:{
      
    },
    contentBox:{
      backgroundColor: 'white',
      // flex: 5,
      flexShrink: 1,
      flexBasis: '0%',
      flexGrow: 1,
      padding: 15,
      borderRadius: 15,
      
      // css에서 하던 shadow와 비슷하지만 사용 방법이 다름 
      // ios는 아래 방법 대로, android는 두 번째 방법 대로 설정해 줘야 함
      ...Platform.select({
        ios:{
          shadowColor: '#B3B3B3',
          shadowOffset: {width: 2, height: 2, },
          shadowOpacity: 0.2,
          shadowRadius: 10,
        },
        android:{
          elevation: 20,
        }
      })
  
    },
    AgreeButton:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
      height: 50
    },
    deadLineBox:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    goodImage:{
      width: 30,
      height: 30
    },
    badImage:{
      width: 30,
      height: 30
    },
    AgreeBox:{
      alignItems: 'center',
      justifyContent: 'center',
    },
    disAgreeBox:{
      marginLeft: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    Agree:{
      fontSize: 10,
      margin: 3,
      fontWeight: '600'
    },
    disAgree:{
      fontSize: 10,
      margin: 3,
      fontWeight: '600'
    },
    deadLineText:{
      color: '#B3B3B3',
      fontSize: 10,
      marginBottom: 30
    }
});

const AgreeContainer =()=>{

  const [posts, setPostData] = useState(null);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/board_data');
      const data = await response.json();
      setPostData(data);
      // console.log(posts);
    } catch (error) {
      console.log('게시물 가져오기 에러', error.message);
    }
  };

  fetchPosts();
}, []);


const renderText = ({ item }) => {
  // 'vs'를 기준으로 문자열을 분리
  const parts = item.board_content.split(',');

 // 출력이 되어야 데이터를 잘 받고 있단 의미인데 출력이 안 됨 
  // console.log("게시물 내용:", item.board_content); // 데이터 출력 확인
 
  return (
    <View style={styles.textBox}>
      {/* 분리된 각 부분을 <Text>로 렌더링 */}
      {parts.map((part, index) => (
        <Text key={index} style={part === ' vs ' ? styles.vsText : styles.text}>
          {part}
        </Text>
      ))}
    </View>
  );
 };

// redux의 dispatch 함수를 가져옴 
const dispatch = useDispatch();

// posts 상태가 존재하면 상태 업데이트 
  const updateState = () => {
    if (!posts) return; // posts가 없으면 업데이트하지 않음
    // 구조 분해 할당: 속성 추출
    const { board_id, state, board_create, board_content } = posts;
    // 액션 생성 함수(addPost)를 호출해 새로운 액션 객체 생성
    // 매개 변수로 board_id, state, board_create, board_content 전달
    const newPostAction = addPost(board_id, state, board_create, board_content);
    // 앞서 생성한 액션 객체를 store의 상태 업데이트
    dispatch(newPostAction);
  };

  
useEffect(() => {
  // 주기적 코드 실행 == intervalId
  const intervalId = setInterval(() => {
    // 현재 시간 가져옴 == now
    const now = new Date();
    // 현재 시간이 12시 0분인지 확인 == 12시면 코드 실행
    if (now.getHours() === 12 && now.getMinutes() === 0) {
    // 함수 호출 == 상태 업데이트 
      updateState();
    }
    // 매 분마다 코드 실행
  }, 1000 * 60);
  // 컴포넌트가 언마운트가 될 때 intervalId에 할당된 인터벌 제거 
  // 인터벌 제거: 메모리 누수를 방지 
  return () => clearInterval(intervalId);
}, []); // dispatch를 의존성 배열에서 제거
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updateState();
  //   }, 1000 * 10);
  //   return () => clearInterval(intervalId);
  // }, [dispatch]); // dispatch를 의존성 배열에 추가

    return(
        <View style={[styles.container,{flexDirection: 'row',}]}>
      

          <View style={styles.contentBox}>
            <View style={styles.goRight}>
              <View style={styles.hapBox}>
                <Text style={styles.hap}>현재 n명 참여</Text>
              </View>
            </View>
        
            {/* <ScrollView style={styles.textBox}> */}
            {/* // 서버로 전송 받은 채팅 데이터 화면에 출력 */}
            <FlatList
             data={posts}
             renderItem={renderText}
            keyExtractor={(item) => item.board_id.toString()}/>

            {/* </ScrollView> */}

            <View style={styles.AgreeButton}>
              <TouchableOpacity style={styles.AgreeBox} >
                <Image style={styles.goodImage} source={require('../../assets/good.png')}></Image>
                  <Text style={styles.Agree}>뭐라</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.disAgreeBox} >
                <Image style={styles.badImage} source={require('../../assets/bad.png')}></Image>
                  <Text style={styles.disAgree}>하지</Text>
              </TouchableOpacity>
            </View>

              <View style={styles.deadLineBox}>
                <Text style={styles.deadLineText}>n일 뒤에 종료됩니다.</Text>
              </View>
              </View>
            <StatusBar style="auto" />
      </View>
    )
}

export default AgreeContainer;