import React, { FC } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from './src/Home';

const App: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
  }
})

export default App;
