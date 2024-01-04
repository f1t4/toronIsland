import React from "react";
import {  StyleSheet, Text, View, StatusBar, Image, SafeAreaView  } from 'react-native';
import { TouchableOpacity } from 'react-native';

const  AgreeHeader =()=> {
    
const styles = StyleSheet.create({

      title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 0
      },
      backImage:{
        width: 30,
        height: 30,
        marginTop: 10

      }
})
    return(
      <SafeAreaView style={styles.header}>
          <TouchableOpacity>
           <Image style={styles.backImage} source={require('../../assets/back.png')}></Image>
         </TouchableOpacity>

        <View style={styles.titleBox}>
          <Text style={styles.title}>토론의 장</Text>
            <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    )
}

export default AgreeHeader;
