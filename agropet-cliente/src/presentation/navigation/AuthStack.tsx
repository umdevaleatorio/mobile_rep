import { createStackNavigator } from '@react-navigation/stack';
import ClientLoginScreen from '../screens/auth/ClientLoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="ClientLoginScreen">
      <Stack.Screen name="ClientLoginScreen" component={ClientLoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  );
}
