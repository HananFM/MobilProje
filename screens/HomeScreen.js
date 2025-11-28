import React from 'react';
import { View, StyleSheet } from 'react-native';
import Timer from '../components/Timer';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Timer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
