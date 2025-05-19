import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import PetGame from './src/components/PetGame';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <PetGame />
    </SafeAreaView>
  );
}
