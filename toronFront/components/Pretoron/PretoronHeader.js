import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = ({headerText}) => {
    return (
        <View style={styles.container}>
            <Text style= {styles.headerText} >{headerText}</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container : { 
        marginTop : 30,
        marginBottom : 10,
    }, 
    headerText : {
        fontSize : 28,
        fontWeight : "700"
    }, 

});
