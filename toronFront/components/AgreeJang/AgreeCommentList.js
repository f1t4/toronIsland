//toronFront/components/AgreeJang/AgreeCommentList.js
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AgreeComment from './AgreeComment';

const AgreeCommentList = ({ onCommentAdded }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // 서버에서 댓글 목록을 가져와서 setComments로 업데이트
        const fetchComments = async () => {
          try {
            const serverUrl = 'http://10.0.2.2:3000/comments';
            const response = await fetch(serverUrl);
            const data = await response.json();
            setComments(data);
          } catch (error) {
            console.error('댓글 가져오기 에러:', error);
          }
        };
    
        // 컴포넌트가 마운트될 때와 comments가 변경될 때마다 실행
        fetchComments();
      }, [onCommentAdded]);
    return (
        <View style={styles.test}>
            <ScrollView>
                {comments.map((comment, index) => (
                    <AgreeComment key={index} comment={comment} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    test: {},
});

export default AgreeCommentList;