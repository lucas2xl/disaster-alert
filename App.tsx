import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SplashContextProvider } from './src/hooks/useSplash';
import { Routes } from './src/routes/index.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SplashContextProvider>
            <StatusBar
              style="light"
              backgroundColor="transparent"
              translucent
            />
            <Routes />
          </SplashContextProvider>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
