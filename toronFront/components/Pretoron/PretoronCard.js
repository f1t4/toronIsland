import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

const ToronCard = ({ date, title, participants }) => {
  const [participantsWidth, setParticipantsWidth] = useState(0);

  // vs로 문자열 나누는 함수
  const renderText = (text, maxLength) => {
    const parts = text.split(',');
    return (
      <View style={styles.title}>
        {parts.map((part, index) => (
          <Text key={index} style={styles.titleText}>
            {part}
          </Text>
        ))}
      </View>
    );
  };


  //글자 길이 제한 
  const turnText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3) + '...';
  }


  useEffect(() => {
    if (participants) {

      // participants 길이에 따라서 달라짐
      // [추후 수정] participants 수에 자동 쉼표 추가 (어렵나?)
      // [채원 수정 : 지금 데이터베이스에 참여자 로직은 없는 관계로, 참여자 있으면 작동 없으면 '참여자 없음' 이라고 표시하도록 삼항 연산자 사용]
      setParticipantsWidth((participants.toString() || '').length * 10 + 70);
    }
  }, [participants]);

  return (
    <View style={styles.cardContainer}>

      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date}</Text>
      </View> 
      <View style={styles.titleContainer}>
        <Text style={styles.title} >{renderText(turnText(title, 22))}</Text>
      </View>

      <View style={styles.participantsContainer}>
        <View
          style={{
            alignItems: 'center',
            width: participantsWidth,
            height : '40%',
            // marginTop: 8,
            backgroundColor: '#EFEFEF',
            padding: 3,
            borderRadius: 20
          }}>
            <Text style={styles.participantsText}>
              {participants !== undefined && participants !== 0
                ? `${participants} 명 참여`
                : '참여자 없음'}
            </Text>

          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    
    elevation: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)", //마지막은 투명도
    
    elevation: 3,
    shadowOpacity: 2,
    shadowRadius: 30,
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 15,
    
    flex : 1,
    marginHorizontal : 20,
    marginVertical : 14,
  
    overflow: 'hidden',
    
  },
  title: {
    display : "flex",
    flexDirection : "row",
    // backgroundColor : 'skyblue'
  },
  titleText : {
    
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 15,
    // marginTop: 8,
    color: '#282828',
  },
  participantsText: {
    width : '100%',
    fontSize: 12,
    color: 'black',
  },
  dateContainer : {
    backgroundColor : 'tomato',
    height : '20%'
  },
  titleContainer: {
    height : '40%',
    // marginHorizontal : 10,
    alignItems: 'center', 
    justifyContent : 'center', 
    overflow :'hidden',
  },
  participantsContainer: {
    justifyContent : 'center',
    alignItems: 'center',
    // backgroundColor : 'tomato'
  }
});

export default ToronCard;