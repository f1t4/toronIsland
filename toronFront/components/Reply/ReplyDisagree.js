import React from "react";
import { ScrollView, View, StyleSheet } from 'react-native';
import CommentBox from "./ReplyCommentBox";
const DisagreeScreen = () => {
    const DisagreeColor = ['#A6F0F0', '#C9F5FF']

    return (
        <ScrollView style={{flex : 1}}>
            <View style={styles.box} >
                <CommentBox colors={DisagreeColor} />
            </View>
            <View style={styles.box} >
                <CommentBox colors={DisagreeColor} />
            </View>
            <View style={styles.box} >
                <CommentBox colors={DisagreeColor} />
            </View>
            <View style={styles.box} >
                <CommentBox colors={DisagreeColor} />
            </View>
            <View style={styles.box} >
                <CommentBox colors={DisagreeColor} />
            </View>
            <View style={styles.box} >
                <CommentBox colors={DisagreeColor} />
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    box : {
        marginVertical : 12,
        marginHorizontal : 30,
        
    }
})

export default DisagreeScreen;
