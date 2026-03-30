import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import ManageProductsScreen from '../screens/admin/ManageProductsScreen';
import ProductCreateScreen from '../screens/admin/ProductCreateScreen';
import OrdersScreen from '../screens/admin/OrdersScreen';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator initialRouteName="AdminHomeScreen">
      <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ title: 'Painel Admin', headerShown: false }} />
      <Stack.Screen name="ManageProductsScreen" component={ManageProductsScreen} options={{ title: 'Gerenciar Produtos' }} />
      <Stack.Screen name="ProductCreateScreen" component={ProductCreateScreen} options={{ title: 'Novo Produto' }} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ title: 'Pedidos dos Clientes' }} />
    </Stack.Navigator>
  );
}
