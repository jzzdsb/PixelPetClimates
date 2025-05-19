import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import PetGame from './src/components/PetGame';

/**
 * 应用主组件
 */
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <PetGame />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
