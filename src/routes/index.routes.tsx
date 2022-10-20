import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { useSplash } from '../hooks/useSplash';
import { Chat } from '../Screens/Chat';
import { Home, IAlert } from '../Screens/Home';
import { Splash } from '../Screens/Splash';

type StackRoutes = {
  Home: undefined;
  Chat: { data: IAlert };
};

const Stack = createStackNavigator<StackRoutes>();

export function Routes() {
  const { loading } = useSplash();

  if (loading) {
    return <Splash />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
