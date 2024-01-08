import React from "react";
import { FlatList, StyleSheet, Text, View, StatusBar, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';


const renderText = ({ item }) => {
  return (
    <View style={styles.textBox}>
      <Text style={styles.text}>{item.board_content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
      fontSize: 16,
      color: 'black',
      fontWeight: '700',
      // marginLeft: '20%'
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
  
  const[posts, setPosts] = useState([]);



    useEffect(()=>{
      const fetchPosts = async ()=>{
        try{
          const response = await fetch('http://10.0.2.2:3000/board_data')
          const data = await response.json();
          
          setPosts(data);
          console.log(data);
          // console.log(data[0].board_content);
        }catch(error){
          console.log('게시물 가져오기 에러', error.message);
          
        }
      };
      fetchPosts();
      // const intervalId = setInterval(()=>{
      //   fetchPosts();
      // }, 7 * 24 * 60 * 60 * 1000);
      
    return () => {
      // clearInterval(intervalId);
    };
    }, []);


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