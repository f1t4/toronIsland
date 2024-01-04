import React from "react";
import {  StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const turnText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3) + '...';
}

const CommentBox = ({colors}) => {
    const title = "인공지능의 윤리에 대하여"
    const myReply = "인공지능이 상용화 되기 위해서는 법을 잘 만드는게 중요하다고 생각합니다"

    return (
    <LinearGradient name='mycomment' colors={colors} style={styles.agreeComment}>
        <View style={styles.textBox}>

            <View style={styles.textBoxTop}>
                <View name="title">
                    <Text style={styles.titleText}>{turnText(title, 12)}</Text>
                </View>

                <View name="date">
                    <Text style={styles.dateText}>10월 18일</Text>
                </View>
            </View>

            <View style={styles.textBottom}>
                <Text style={{fontSize : 15}}>{turnText(myReply, 20)}</Text>
            </View>


        </View>
    </LinearGradient> 

    );
}

const styles = StyleSheet.create({

    agreeComment : {

        borderRadius : 10,

        paddingVertical : 16, 
        // justifyContent : 'center',
        alignItems : 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3, 
    },
    
    textBox : {

        paddingVertical : 8,
        // backgroundColor : 'green',

    },

    textBoxTop :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingBottom : 3
        // backgroundColor : 'black'
        
    },

    titleText : {
        // backgroundColor : 'tomato',
        fontSize : 20,
        fontWeight : 'bold',
        
    },

    dateText :{
        // backgroundColor : 'violet',
        opacity : 0.7,
        fontSize : 12
    },
    textBottom : {
        // backgroundColor : 'yellow',
        fontSize : 17,
        marginRight : 80
    }

})

export default CommentBox;