import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';
import { AuthContext } from '../../contexts/AuthContext';

export default function AdminHomeScreen({ navigation }: any) {
  const { session } = useContext(AuthContext);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Administrativo</Text>
      <Text style={styles.subtitle}>Logado como: {session?.user?.email}</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Gerenciar Produtos" onPress={() => navigation.navigate('ManageProductsScreen')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Ver Pedidos da Loja" onPress={() => navigation.navigate('OrdersScreen')} color="green" />
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Sair do Sistema" onPress={handleLogout} color="darkred" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 40, color: 'gray' },
  buttonContainer: { marginVertical: 10 },
  logoutContainer: { marginTop: 50 },
});
