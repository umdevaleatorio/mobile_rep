import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, Alert } from 'react-native';
import { CartContext } from '../../contexts/CartContext';

export default function CartScreen({ navigation }: any) {
  const { cart, removeFromCart, clearCart, total } = useContext(CartContext);

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Esvaziado', 'Seu carrinho está vazio.');
      return;
    }
    navigation.navigate('PaymentScreen');
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      {item.image_url ? (
        <Image source={{ uri: item.image_url }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: '#eee', justifyContent: 'center' }]}><Text style={{textAlign: 'center'}}>N/A</Text></View>
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>R$ {item.price.toFixed(2)} x {item.quantity}</Text>
        <Button title="Remover" onPress={() => removeFromCart(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meu Carrinho (SQLite Offline)</Text>
      
      {cart.length === 0 ? (
        <Text style={styles.empty}>Adicione produtos na aba Início.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
            <Button title="Limpar Tudo" onPress={clearCart} color="darkred" />
            <View style={{ marginVertical: 5 }} />
            <Button title="Finalizar Compra" onPress={handleCheckout} color="green" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 10, marginBottom: 10, borderRadius: 8, elevation: 1 },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  info: { flex: 1, justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#333', marginVertical: 5 },
  footer: { borderTopWidth: 1, borderColor: '#ddd', paddingTop: 15, paddingBottom: 10 },
  totalText: { fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginBottom: 10 }
});
