import { Text, View, StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter'
import { Loading } from './src/Loading';
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })
  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }
  return (
    <View>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
    </View>
  );
}

