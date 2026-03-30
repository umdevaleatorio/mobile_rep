import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // Vai pro raw_user_meta_data para nossa Trigger capturar
        }
      }
    });

    if (error) {
      Alert.alert('Erro ao cadastrar', error.message);
    } else if (data.session == null) {
      Alert.alert('Sucesso!', 'Verifique seu e-mail para confirmar a conta (caso ativado no Supabase).');
      navigation.goBack();
    } else {
      // Já está logado se não tiver Email Confirmation Required
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta Cliente</Text>
      
      <TextInput style={styles.input} placeholder="Nome Completo" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      
      <Button title={loading ? "Cadastrando..." : "Cadastrar"} onPress={handleRegister} disabled={loading} />
      
      <View style={{marginTop: 20}}>
        <Button title="Voltar ao Login" onPress={() => navigation.goBack()} color="gray" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
