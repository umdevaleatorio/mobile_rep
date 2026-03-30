import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';
import { AuthContext } from '../../contexts/AuthContext';

export default function ProfileScreen({ navigation }: any) {
  const { session } = useContext(AuthContext);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.subtitle}>Conta: {session?.user?.email}</Text>
      
      <View style={{ marginTop: 50 }}>
        <Button title="Fazer Logout" onPress={handleLogout} color="darkred" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 40, color: 'gray' },
});
