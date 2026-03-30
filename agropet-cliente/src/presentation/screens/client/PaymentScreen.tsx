import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { supabase } from '../../../data/datasources/supabase/client';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';

export default function PaymentScreen({ navigation }: any) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [paymentMethod, setPaymentMethod] = useState('PIX'); 
  const [loading, setLoading] = useState(false);

  // O Total é exatamente o que está no carrinho (não tem sistema de frete complexo nesse fluxo)
  const grandTotal = total;

  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      Alert.alert('Erro', 'Seu resumo está vazio.');
      return;
    }

    setLoading(true);
    try {
      // 1. Criar Ordem Principal
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id,
          status: 'confirmed',
          total: grandTotal,
          delivery_type: 'retirada', // Fixo provisoriamente
          payment_method: paymentMethod.toLowerCase(),
          delivery_address: '', // Esvaziado, pois não usa mais
          needs_change: '',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;

      // 2. Inserir Itens
      const orderItems = cart.map(item => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Sucesso! Limpar Carrinho
      await clearCart();
      navigation.replace('PaymentConfirmScreen', { orderId });

    } catch (err: any) {
      Alert.alert('Erro ao Fazer Pedido', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumo do pedido:</Text>

      {/* Tabela de Resumo */}
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.headerText, { flex: 2 }]}>Produto</Text>
          <Text style={[styles.tableCell, styles.headerText]}>Quantidade</Text>
          <Text style={[styles.tableCell, styles.headerText]}>Preço</Text>
        </View>

        {cart.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={2}>{item.name}</Text>
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, { textAlign: 'right' }]}>R$ {item.price.toFixed(2)}</Text>
          </View>
        ))}

        <View style={[styles.tableRow, styles.tableFooter]}>
          <Text style={[styles.tableCell, styles.footerText, { flex: 3 }]}>Total do pedido:</Text>
          <Text style={[styles.tableCell, styles.footerText, { textAlign: 'right' }]}>R$ {grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.title}>Forma de pagamento:</Text>

      {/* Área de Pagamento baseada no Design */}
      <View style={styles.paymentBox}>
        {/* Placeholder do Dropdown (Pode ser melhorado pro Skeleton) */}
        <View style={styles.dropdownDummy}>
           <Button title={`MÉTODO: ${paymentMethod}`} onPress={() => {
             // Mock de um dropdown nativo (Alterna pra testar)
             setPaymentMethod(prev => prev === 'PIX' ? 'DINHEIRO' : prev === 'DINHEIRO' ? 'CARTAO_CREDITO' : 'PIX');
           }} color="#333" />
        </View>

        <Text style={styles.instructionText}>
          Escolha a forma de pagamento e clique em fazer pedido em seguida!
        </Text>

        <View style={{ marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <Button title="Fazer Pedido!" onPress={handleCreateOrder} color="#2A8B1D" />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  title: { fontSize: 20, fontWeight: 'bold', marginVertical: 15, color: '#1B2A3B' },
  
  table: { borderWidth: 1, borderColor: '#1B2A3B', borderRadius: 8, overflow: 'hidden', marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#1B2A3B', backgroundColor: '#212A3E' },
  tableHeader: { backgroundColor: '#1B2A3B' },
  tableFooter: { backgroundColor: '#1B2A3B' },
  tableCell: { flex: 1, padding: 10, color: '#fff', fontSize: 14 },
  headerText: { fontWeight: 'bold', textAlign: 'center' },
  footerText: { fontWeight: 'bold', fontSize: 16 },

  paymentBox: { backgroundColor: '#E2E6EF', padding: 20, borderRadius: 12, marginBottom: 40 },
  dropdownDummy: { backgroundColor: '#fff', marginBottom: 15, borderRadius: 5, overflow: 'hidden' },
  instructionText: { textAlign: 'center', color: '#444', marginBottom: 15, fontSize: 14, paddingHorizontal: 10 },
});
