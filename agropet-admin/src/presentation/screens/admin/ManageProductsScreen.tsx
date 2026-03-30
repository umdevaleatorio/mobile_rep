import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';

export default function ManageProductsScreen({ navigation }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      Alert.alert('Erro ao carregar', error.message);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Busca inicial
    fetchProducts();
    // Re-buscar toda vez que a tela ganhar foco
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProducts();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text>R$ {item.price}</Text>
      <Text>Estoque: {item.stock}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('ProductEditScreen', { id: item.id })} color="gray" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Produtos</Text>
      
      <Button title="+ Novo Produto" onPress={() => navigation.navigate('ProductCreateScreen')} />
      
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : products.length === 0 ? (
        <Text style={styles.empty}>Nenhum produto cadastrado.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 10 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: 'gray' }
});
