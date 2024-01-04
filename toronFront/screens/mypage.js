import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import MypageProfile from "../components/Mypage/mypageProfile";
import MypageMenu from "../components/Mypage/mypageMenu";
import { useState } from "react";

export default function Mypage(){
    const [menu, setMenu] = useState([
        {id : 0, title : '내 정보'},
        {id : 1, title : '댓글 단 글'},
        {id : 2, title : '고객센터'},
        {id : 3, title : '설정'}
    ]);
    
    return (
        <View style={styles.wrap}>
            <View style={styles.nav}>
                <TouchableOpacity activeOpacity={0.8} style={styles.exitBtn}>
                    <Image
                        source={require('../assets/exit.png')}
                        style={styles.exitImg}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <MypageProfile></MypageProfile>
                <View style={styles.profile}>
                    <Text style={styles.name}>name</Text>
                    <Text style={styles.email}>email@email.com</Text>
                </View>
            </View>
            <View style={styles.article}>
                <MypageMenu
                    data={menu}
                    menuList={styles.menu}
                    menuTitle={styles.title}
                    menuBtn={styles.moveBtn}
                    menuMove={styles.moveImg}
                ></MypageMenu>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap : {
        width : '100%',
        height : '100%',
        marginTop : 30,
        backgroundColor : '#eaeaea'
    },
    nav : {
        flex : 1,
        flexDirection : 'row-reverse',
        backgroundColor : '#fff'
    },
    exitBtn : {
        width : '15%',
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    exitImg : {
        width : '40%',
        height : '40%',
        resizeMode : 'contain'
    },
    header : {
        flex : 2,
        paddingLeft : 40,
        paddingRight : 40,
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#fff'
    },
    profile : {
       height : 70,
       paddingLeft : 20,
       flexDirection : 'column',
       alignItems : 'flex-start'
    },
    name : {
        flex : 2,
        width : '100%',
        textAlign : 'left',
        fontSize : 40,
        fontWeight : 'bold'
    },
    email : {
        flex : 1,
        width : '100%',
        textAlign : 'left',
        fontSize : 17
    },
    article : {
        flex : 6,
        marginTop : 20,
        flexDirection : 'column',
        backgroundColor : '#fff'
    },
    menu : {
        width : '100%',
        height : '20%',
        flexDirection : 'row',
        paddingLeft : 20,
        paddingRight : 10,
        alignItems: 'center',
        justifyContent : 'space-between',
        borderBottomWidth : 1,
        borderBottomColor : '#eee',
        borderStyle : 'solid'
    },
    title : {
        fontSize : 25,
    },
    moveBtn : {
        width : '15%',
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    moveImg : {
        width : '30%',
        height : '30%',
        resizeMode : 'contain'
    }
});