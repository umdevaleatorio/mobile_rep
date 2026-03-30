import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClientTabs from './ClientTabs';
import PaymentScreen from '../screens/client/PaymentScreen';
import PaymentConfirmScreen from '../screens/client/PaymentConfirmScreen';

const Stack = createStackNavigator();

export default function ClientStack() {
  return (
    <Stack.Navigator>
      {/* Abas inferiores na raiz */}
      <Stack.Screen name="ClientTabs" component={ClientTabs} options={{ headerShown: false }} />
      {/* Telas complementares de fluxo (Checkout) */}
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Pagamento e Entrega' }} />
      <Stack.Screen name="PaymentConfirmScreen" component={PaymentConfirmScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
