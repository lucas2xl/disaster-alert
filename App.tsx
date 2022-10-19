import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Home } from './src/Screens/Home';
import { SplashContextProvider } from './src/hooks/useSplash';

export default function App() {
  return (
    <NativeBaseProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SplashContextProvider>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <Home />
        </SplashContextProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
