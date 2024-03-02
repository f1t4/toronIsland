import React from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

const LoginWeb = () => {
    return(
        <WebView 
            source={{uri : 'https://887c-59-154-5-58.ngrok-free.app/login/auth/google/callback'}}
            javaScriptEnabled={true}
            style={styles.webBody} />
    );
}

const styles = StyleSheet.create({
    webBody : {
        flex : 1
    }
});

export default LoginWeb;