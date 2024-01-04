import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import CommentBox from "./ReplyCommentBox";

const OnlyCommentScreen = () => {
    const OnlyCommentColor = ['#e2ebf0','#cfd9df' ]

    return (
        <ScrollView style={{flex : 1}}>
            <View style={styles.box} >
                <CommentBox colors={OnlyCommentColor}/>
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

export default OnlyCommentScreen;