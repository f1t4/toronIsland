import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const LoginWeb = () => {
    return(
        <WebView 
            source={{uri : `http://192.168.100.39:3000/login/auth/google`}}
            style={styles.webBody} />
    );
}

const styles = StyleSheet.create({
    webBody : {
        flex : 1
    }
});

export default LoginWeb;