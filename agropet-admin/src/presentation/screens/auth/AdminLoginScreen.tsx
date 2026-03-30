import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';

export default function AdminLoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // 1. Tenta fazer o auth signIn
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
       Alert.alert('Erro ao entrar no Painel', error.message);
    } 
    // O AuthContext do Admin intercepta o login com sucesso e expulsa se a `role` não for 'admin'.
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Administrativo - AgroPet</Text>
      <Text style={styles.subtitle}>Acesso Restrito</Text>
      
      <TextInput style={styles.input} placeholder="Email corporativo" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha do Admin" value={password} onChangeText={setPassword} secureTextEntry />
      
      <Button title={loading ? "Verificando Credenciais..." : "Acessar Sistema"} onPress={handleLogin} disabled={loading} color="darkred" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', fontWeight: 'bold' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: 'gray' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
