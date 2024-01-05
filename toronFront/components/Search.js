import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const SearchBar = () => {
    const [search, setSearch] = useState(''); // 검색어 상태  
    const navigation = useNavigation();

    const handleSearch = () => {
      if (search.trim() !== '') {
        // 검색어가 존재할 때만 프리토론 스크린으로 이동
        navigation.navigate('Pretoron', { searchQuery: search });
      }
    };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
      <TextInput
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          paddingLeft: 45, // 아이콘이 들어갈 공간 확보
          paddingBottom: 8,
          paddingTop: 8,
          flex: 1,
          borderRadius: 50,
        }}
        placeholder="Search..."
        value={search} //현재 검색어 표시
        onChangeText={setSearch} // 사용자 검색어 상태 저장
        onSubmitEditing={handleSearch} //사용자가 검색을 제출하면 handelSearch 호출
      />
      <Ionicons name="search" size={20} style={{ position: 'absolute', left: 15, zIndex: 1, color: 'gray' }} />
    </View>
  );
};

export default SearchBar;
