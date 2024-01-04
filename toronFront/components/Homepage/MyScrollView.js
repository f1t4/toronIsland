import React from 'react';
import { ScrollView } from 'react-native';

const MyScrollView = ({ children, style }) => {
  return (
    <ScrollView style={{ flex: 1, ...style }}>
      {children}
    </ScrollView>
  );
};

export default MyScrollView;