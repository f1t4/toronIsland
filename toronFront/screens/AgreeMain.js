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
    const [dynamicBoardId, setDynamicBoardId] = useState('11');  // 예시 값, 실제 값으로 대체
    const [dynamicUserId, setDynamicUserId] = useState(1);


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

      const [comments, setComments] = useState([]);

    const handleCommentAdded = async (newComment) => {
        try {
            const serverUrl = 'http://10.0.2.2:3000/comments';

            const commentData = {
                username: '사용자명', // 사용자명을 실제 사용자명으로 변경
                content: newComment.content,
            };

            const response = await fetch(serverUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            const result = await response.json();
            console.log('댓글 추가 응답:', result);

            setComments([...comments, result]);
        } catch (error) {
            console.error('댓글 추가 에러:', error);
            Alert.alert('댓글 추가 실패', '댓글을 추가하는 중에 오류가 발생했습니다.');
        }
    };


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
            <AgreeCommentList onCommentAdded={handleCommentAdded} />
            <AgreeInput
                onCommentAdded={handleCommentAdded}
                dynamicBoardId={dynamicBoardId}
                dynamicUserId={dynamicUserId}
            />
            </View>

        </View> 
    )
}

export default AgreeMain;
