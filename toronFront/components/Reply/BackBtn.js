import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const BackBtn = () => {
  return (
    <TouchableOpacity style={styles.iconbutton}>
             <Image source={require('../arrow.png')} style={styles.iconImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconbutton: {
    flex : 1,
    width : 50,
    padding : 30,
    justifyContent : 'center',
    backgroundColor : '#fff',
  },
  iconImage: {
    width: 25, // 이미지의 가로 크기
    height: 25, // 이미지의 세로 크기
  },
});

export default BackBtn;
