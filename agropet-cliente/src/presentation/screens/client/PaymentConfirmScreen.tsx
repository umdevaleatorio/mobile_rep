import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function PaymentConfirmScreen({ route, navigation }: any) {
  const { orderId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedido Confirmado! 🎉</Text>
      <Text style={styles.sub}>
        A AgroPet recebeu seu pedido e já está preparando.
      </Text>
      
      <Text style={styles.orderNumber}>Nº do Pedido: {orderId?.slice(0, 8).toUpperCase()}</Text>

      <View style={{ marginTop: 40 }}>
        <Button title="Voltar para a Loja" onPress={() => navigation.popToTop()} color="green" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 30, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'darkgreen', marginBottom: 15, textAlign: 'center' },
  sub: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
  orderNumber: { fontSize: 18, color: 'gray', fontWeight: 'bold' }
});
