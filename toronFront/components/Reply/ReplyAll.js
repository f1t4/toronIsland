import React from "react";
import {StyleSheet, View, ScrollView } from 'react-native';
import AgreeScreen from "./ReplyAgree";
import DisagreeScreen from "./ReplyDisagree";
import OnlyCommentScreen from "./ReplyOnlyComment";

const AllScreen = () => {
    
    return (
        <ScrollView >
            <View >
                <AgreeScreen/>
                <OnlyCommentScreen/>
                <DisagreeScreen/>
            </View>

        </ScrollView>
        
    );
};



export default AllScreen;