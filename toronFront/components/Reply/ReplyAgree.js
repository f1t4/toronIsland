import React from "react";
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CommentBox from "./ReplyCommentBox";

const AgreeScreen = () => {
    const AgreeColor = ['#FFE0B2', '#FFF1CF']

    return (
        <ScrollView style={{flex : 1}}>
            <View style={styles.box} >
                <CommentBox colors={AgreeColor}/>

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

export default AgreeScreen;