//toronFront/screens/AgreeMain.js

import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import AgreeHeader from "../components/AgreeJang/AgreeHeader";
import AgreeContainer from "../components/AgreeJang/AgreeContainer";
import { LinearGradient } from 'expo-linear-gradient'
import AgreeInput from "../components/AgreeJang/AgreeInput";
import AgreeCommentList from "../components/AgreeJang/AgreeCommentList";

// background FDC8E1: 왼쪽 끝 : 연분홍
// CFBAFD 그 다음 : 연보라 
// A8F1A1 그 다음 : 연두
// C2F4FC 그 다음 : 연하늘 

const  AgreeMain =({navigation})=> {
    const [dynamicUserId, setDynamicUserId] = useState(1);
    const [comments, setComments] = useState([]);
    const [boardId, setBoardId] = useState([1]);

    // // 로그인 후 사용자 정보를 받아와서 dynamicUserId 설정
    // const handleLogin = async (userInfo) => {
    //     // 사용자 정보에서 userId 추출
    //     const userId = userInfo.id; // 이 예시에서는 사용자 정보에 id가 있다고 가정합니다.
    //     setDynamicUserId(userId);
    // };


    const styles = StyleSheet.create({
        main:{
            flex: 1,
            padding: 20,

          },
        agreeContainer:{
            flex: 4,
        },
        agreeCommentInputContainer: {
            flex: 4, 
          },
        
       
    })
    // 리액트 자동 설정 상단 바 삭제 
    React.useLayoutEffect(() => {
        // Ensure that navigation is defined before using setOptions
        if (navigation) {
          navigation.setOptions({
            headerShown: false,
          });
        }
    }, [navigation]);


    return(
        <View style={styles.main}>
            <LinearGradient  colors={['rgba(253,200,209,0.3)','rgba(207,186,253,0.3)','rgba(168,241,161,0.3)','rgba(194,244,252,0.3)']}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}

            ></LinearGradient>

            <View style={styles.agreeHeader}>
                <AgreeHeader />
            </View>

            <View style={styles.agreeContainer}>
                <AgreeContainer />
            </View>
            <View style={styles.agreeCommentInputContainer}>
            <AgreeCommentList comments={comments} />
            <AgreeInput
                onCommentAdded={(newComment) => setComments([...comments, newComment])}
                dynamicUserId={dynamicUserId}
                boardId={boardId}
            />
            </View>

        </View> 
    )
}

export default AgreeMain;
