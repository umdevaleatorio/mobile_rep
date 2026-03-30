import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';
import { CartContext } from '../../contexts/CartContext';

export default function HomeScreen({ navigation }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useContext(CartContext);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (!error) setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: '#eee', justifyContent: 'center' }]}>
           <Text style={{textAlign: 'center'}}>Sem Imagem</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
        
        <Button 
          title="Adicionar ao Carrinho" 
          onPress={() => addToCart(item)} 
          disabled={item.stock <= 0} 
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lojinha AgroPet</Text>
      <Text style={styles.sub}>Itens no Carrinho: {cart.length}</Text>
      
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  sub: { fontSize: 16, color: 'green', marginBottom: 15 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, elevation: 1 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  desc: { fontSize: 12, color: '#666' },
  price: { fontSize: 16, color: '#000', fontWeight: 'bold', marginVertical: 5 }
});
