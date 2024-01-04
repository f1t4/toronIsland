import { useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import AlertMenu from "../components/alertMenu";
import { createStackNavigator } from '@react-navigation/stack';

export default function Alert(){
    const [checked, setChecked] = useState(0); /*확인유무 체크 check 이용해서 reddot 삽입 유무 결정 ~> onclick(setChecked)*/
    const [icon, setIcon] = useState([
        {type : 'notice', image : '../asset/notice.png'},
        {type : 'chat', image : '../asset/chat.png'}
    ]);
    const [today, setToday] = useState(new Date); /*날짜 체크, getDate() new Date 만들어서 동일하면 오늘, 안같으면 getMonth, getDate해서 어제 표기 둘 다 아닐 경우 월일 출력*/

    // const [type, setType] = useState([]);
    // const [title, setTitle] = useState([]);
    // const [desc, setDesc] = useState([]);

    const [alertLog, setAlertLog] = useState([
        {id:0, type:'chat', title:'토론의 창', desc:'\'어쩌구저쩌구\'의 토론이 종료되었습니다.\n결과를 확인해보세요', date:new Date(2023, 10, 17)},
        {id:1, type:'notice', title:'공지사항', desc:'토론섬 어플 이용 안내', date:new Date(2023, 10, 16)}
    ])
    
    return (
        <View style={styles.wrap}>
            <View style={styles.nav}>
                <TouchableOpacity style={styles.backBtn}>
                    <Image
                        source={require('../assets/back.png')}
                        style={styles.backImg}
                    ></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.title}>알림</Text>
            </View>
            <View style={styles.main}>
                <AlertMenu
                    data={alertLog}
                    icon={icon}
                    today={today}
                    onCheckedAlert={()=>{
                        setChecked(1);
                    }}
                ></AlertMenu>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap : {
        width : '100%',
        height : '100%',
        marginTop : 30,
        flexDirection : 'column',
        alignItems : 'flex-end',
        backgroundColor : '#eee'
    },
    nav : {
        flex : 5/4,
        width : '80%',
        backgroundColor : '#fff'
    },
    backBtn : {
        width : '20%',
        height : '100%',
        flexDirection : 'row',
        alignItems : 'center'
    },
    backImg : {
        width : '60%',
        height : '60%',
        marginLeft : '20%',
        marginTop : '10%',
        resizeMode : 'contain'
    },
    header : {
        flex : 2,
        width : '80%',
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : '#fff'
    },
    title : {
        width : '20%',
        fontSize : 27,
        textAlign : 'right'
    },
    main : {
        flex : 15,
        width : '80%',
        backgroundColor : '#fff'
    }
});