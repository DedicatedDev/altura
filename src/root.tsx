import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import route from './route';
import {navigationRef} from './utils/helper';
import useGlobalStore from './stores/app';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
export default function Root() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
    
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName=""
            screenOptions={{
              headerShown: false,
            }}>
            {route.map(r => {
              return (
                <Stack.Screen
                  name={r.name}
                  component={r.component}
                  key={r.name}
                />
              );
            })}
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}
