import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Alert from './alert';
import { useNavigation } from '@react-navigation/native';

export default function StartIndex(){
    const [fontLoad, setFontLoad] = useState(false);
    useEffect(()=>{
        async function loadFont(){
            await Font.loadAsync({
                interReg : require('../assets/fonts/Inter-Regular.ttf'),
                interSem : require('../assets/fonts/Inter-SemiBold.ttf')
            });
        }
        loadFont()
            .then(() => setFontLoad(true));
    }, []);
    if(!fontLoad){
        return null;
    }

    // const serverUrl = 'http://localhost:3000';
    // const googleLogInProcess = async()=>{
    //     try{
    //         const googleAuthResponse = await axios.get('http://192.168.100.39:3000/login/auth/google');
    //         console.log('구글 리다이렉션');
    //     } catch (error) {
    //     console.error('Error, Google login:', error);
    //     }
    // }
    //404발생, 28dec
    //해당 URL에서 get 요청 -> 로그인하지도 X -> res X 그래서 404 발생하는 듯
    //화면을 띄워야 함 ~> WebView
    //해결하기,, ~ _감

    const navigation = useNavigation();
    const openLoginPage = ()=>{
        navigation.navigate('Web');
    }

    return(
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.subTitle}>토론섬간단</Text>
                <Text style={styles.subTitle}>소개문구정도...</Text>
                <Text style={styles.mainTitle}>토론섬</Text>
            </View>
            <View style={styles.signup}>
                <Text style={styles.signupText}>SNS 계정으로 간편 가입하기</Text>
                <GestureHandlerRootView style={styles.signupBtnGroup}>
                    <TouchableOpacity style={styles.signupBtn}>
                        <View style={styles.btn}>
                            <Image 
                            source={require('../assets/kakao.png')}
                            style={styles.img}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupBtn}>
                        <View style={styles.btn}>
                            <Image 
                            source={require('../assets/naver.png')}
                            style={styles.img}></Image>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupBtn} onPress={openLoginPage}>
                        <View style={styles.btn}>
                            <Image 
                            source={require('../assets/google.png')}
                            style={styles.img}></Image>
                        </View>
                    </TouchableOpacity>
                </GestureHandlerRootView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body : {
        backgroundColor : '#fff',
        width : '100%',
        height : '100%'
    },
    header : {
        flex : 1,
        backgroudColor : '#fff',
        justifyContent : 'center'
    },
    subTitle : {
        fontFamily : 'interReg',
        fontSize : 30,
        marginLeft : 30,
        color : '#000',
        textAlign : 'left'
    },
    mainTitle : {
        fontFamily : 'interSem',
        fontSize : 50,
        marginLeft : 30,
        fontWeight : 'bold',
        color : '#000',
        textAlign : 'left'
    },
    signup : {
        flex : 1,
        backgroundColor : '#fff',
        alignItems: 'center',
        justifyContent : 'center'
    },
    signupText : {
        fontFamily : 'interReg',
        fontSize : 13,
        color : '#b3b3b3',
        textAlign : 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupBtnGroup : {
        width : '90%',
        height : '20%',
        marginTop : '3%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection : 'row'
    },
    signupBtn : {
        flex : 1,
        margin : '10%'
    },
    btn :{
        flex : 1,
    },
    img : {
        width : '100%',
        height : '100%',
        resizeMode : 'contain'
    }
});