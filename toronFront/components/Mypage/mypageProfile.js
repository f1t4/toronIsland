import {StyleSheet, View, Image} from 'react-native';

const MypageProfile = ()=>{
    /*DB 연동 후 이미지 source 연결시키는 로직 구현 필요*/
    return(
        <View style={styles.profileSize}>
            <Image
                style={styles.profileImg}
            ></Image>
        </View>
    );
}

const styles = StyleSheet.create({
    profileSize : {
        width : 100,
        height : 100,
        borderRadius : 100/2,
        backgroundColor : '#ccc'
    },
    profileImg : {
        resizeMode : 'cover'
    }
});

export default MypageProfile;