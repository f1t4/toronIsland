import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const MypageMenu = (props)=>{
    const infoBox = props.data.map((menu) => {
        return(
            <View key={menu.id} style={props.menuList}>
                <Text style={props.menuTitle}>{menu.title}</Text>
                <TouchableOpacity activeOpacity={0.8} style={props.menuBtn}>
                    <Image source={require('../../assets/move.png')} style={props.menuMove}></Image>
                </TouchableOpacity>
            </View>
        )
    });
    return(
        <View>
            {infoBox}
        </View>
    );
}

export default MypageMenu;