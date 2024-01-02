
import React, { useState, useRef, useEffect } from 'react';
import { Pressable,Image, TouchableOpacity, View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, InputAccessoryView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AgreeInput = ({ onCommentAdded }) => {
    useEffect(()=>{
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
          }) : null
    }, []);
    const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [text, setText] = useState('');

  const handleCommentSubmit = async () => {
try {
    if (!text) {
        console.error('댓글 내용이 비어있습니다.');
        return;
    }
      const serverUrl = 'http://localhost:3000/comments';
  
      const commentData = {
        username: '사용자명',
        content: text,
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
  
      onCommentAdded(result);
  
      setText('');
    } catch (error) {
      console.error('댓글 추가 에러:', error);
    }
  };

  const styles = StyleSheet.create({
    textInput: {
      padding: 7,
      backgroundColor: 'white',
      borderRadius: 10,
      width: '90%',
      fontSize: 14,
      paddingRight: 35,
      height: '90%',
    },
    InputContainer: {
      marginTop: 'auto',
    },
    Button: {
      margin: 10,
    },
    right: {
      alignItems: 'flex-end',
    },
    submitText: {
      fontSize: 18,
    },
    inputStyle: {
      flexDirection: 'row',
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.InputContainer}
      behavior={'padding'}
      keyboardVerticalOffset={statusBarHeight + 50}
    >
      <View style={styles.inputStyle}>
        <TextInput
          style={styles.textInput}
          value={text}
          placeholder={'입력해 주세요.'}
          onChangeText={setText}
          autoCorrect={false}
        />
        <TouchableOpacity title="전송" onPress={handleCommentSubmit}>
          <Image
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
              zIndex: 1,
              width: 30,
              height: 30,
            }}
            source={require('../../assets/submit.png')}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AgreeInput;