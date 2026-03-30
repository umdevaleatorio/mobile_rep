import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { supabase } from '../../../data/datasources/supabase/client';

export default function ProductCreateScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('1');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
      base64: true, // PEGA O BASE64 DIRETO DA GALERIA
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 || null);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !stock) {
      Alert.alert('Erro', 'Preencha Nome, Preço e Estoque.');
      return;
    }

    setLoading(true);
    let uploadedImageUrl = null;

    try {
      // 1. Upload da imagem usando Base64 direto da galeria
      if (imageUri && imageBase64) {
        const fileExt = imageUri.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `public/${fileName}`;

        const arrayBuffer = decode(imageBase64);

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, arrayBuffer, { contentType: `image/${fileExt}` });

        if (uploadError) {
          throw new Error('Falha ao enviar a foto: ' + uploadError.message);
        }

        // Obtém a URL pública garantida
        const { data: urlData } = supabase.storage.from('products').getPublicUrl(filePath);
        uploadedImageUrl = urlData.publicUrl;
      }

      // 2. Insere na tabela 'products'
      const { error: dbError } = await supabase.from('products').insert({
        name,
        description,
        price: parseFloat(price.replace(',', '.')),
        stock: parseInt(stock, 10),
        image_url: uploadedImageUrl,
        active: true,
      });

      if (dbError) throw new Error(dbError.message);

      Alert.alert('Sucesso', 'Produto criado e foto salva com sucesso!');
      navigation.goBack(); // Volta pra lista de produtos que atualizará sozinha via FocusEffect!

    } catch (error: any) {
      Alert.alert('Ocorreu um Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Novo Produto</Text>

      <Button title="Selecionar Foto da Galeria" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TextInput style={styles.input} placeholder="Nome do Produto (ex: Ração 1Kg)" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Descrição curta" value={description} onChangeText={setDescription} multiline />
      <TextInput style={styles.input} placeholder="Preço (ex: 45.90)" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Estoque Atual" value={stock} onChangeText={setStock} keyboardType="numeric" />

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Salvar Produto Completo" onPress={handleSave} color="green" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  image: { width: 100, height: 100, borderRadius: 10, marginVertical: 15, alignSelf: 'center' }
});
