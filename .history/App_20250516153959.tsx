import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Game from './src/components/Game';

/**
 * 应用程序入口组件
 */
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Game />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App; 