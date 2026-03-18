# AgroPet Lambari — E-Commerce Mobile App

## Resumo

Aplicativo mobile de e-commerce para uma loja de agropecuária e petshop localizada em **Lambari, MG**. O app permite que clientes naveguem pelo catálogo de produtos (agro + pet), adicionem ao carrinho (persistido localmente), façam pedidos com pagamento via **PIX (QR Code + Copia e Cola)**, **Dinheiro** ou **Cartão (Crédito/Débito)**, e recebam entregas dentro de um raio de **17km** da cidade. Para clientes fora do raio, o app redireciona para o anúncio no **Mercado Livre**.

O app também inclui um **painel administrativo** integrado (mesmo APK, acesso por tela de login separada com detecção de role) com autenticação reforçada via **biometria do dispositivo**.

## Motivação

- Projeto acadêmico de desenvolvimento mobile (Expo/React Native)
- Cronograma de entregas da disciplina (março a julho 2026)
- Necessidade real de digitalizar as vendas de uma loja AgroPet

## Escopo

### Incluído

**Telas do Cliente (11 telas):**
- Tela de Splash (logo + verificação de sessão)
- Tela de cadastro
- Tela de login (cliente)
- Menu Inicial / Catálogo (com filtros e busca)
- Detalhes do Produto
- Carrinho (persistido no SQLite)
- Tela de Pagamento e Frete (PIX, Dinheiro, Cartão)
- Tela de Confirmação do Pagamento (QR Code PIX + Copia e Cola quando PIX)
- Mapa/Geolocalização (loja, concorrentes, acompanhar entregas)
- Perfil do Usuário (com histórico de pedidos)
- Configurações (tema claro/escuro, endereço padrão, notificações)

**Telas do Admin (10 telas):**
- Tela de login do admin (separada, com biometria)
- Menu Inicial do Admin (Drawer)
- Tela de Pedidos (gerenciar status)
- Painel de Vendas (Dashboard com métricas em tempo real)
- Histórico de Vendas/Caixa (filtro por dia/semana/mês e forma de pagamento)
- Registrar, remover ou desativar produto (CRUD completo)
- Mapa/Geolocalização (acompanhar entregas, gerenciar concorrentes)
- Perfil do Admin
- Configurações (tema claro/escuro, chave PIX, raio entrega, categorias)
- Modo Offline (status de conexão, forçar sincronização)

**Funcionalidades transversais:**
- Login/cadastro de usuários (Supabase Auth)
- Geolocalização para entrega (raio 17km de Lambari)
- Redirecionamento para Mercado Livre (fora do raio)
- Mapa com localização de concorrentes (cadastro manual)
- Auth admin com biometria do dispositivo (expo-local-authentication)
- Tema claro/escuro (para cliente e admin)
- Modo offline com SQLite (catálogo, carrinho, dados em cache)
- Geração de APK final

### Fora do Escopo
- Integração com API do Mercado Livre
- Reconhecimento facial via ML
- Sistema de frete com cálculo automático
- Gateway de pagamento real (cartão de crédito online)
- Chat/suporte em tempo real

## Público-alvo

- **Clientes**: Moradores de Lambari e região que compram produtos agropecuários e de petshop
- **Admin**: Dono/funcionário da loja que gerencia produtos e pedidos

## Tecnologias

| Componente | Tecnologia |
|-----------|-----------| 
| Framework | Expo / React Native |
| Backend | Supabase (Auth, Database, Storage) |
| DB Local | SQLite (expo-sqlite) |
| Mapas | react-native-maps + expo-location |
| Câmera | expo-camera (QR Code PIX) |
| Biometria | expo-local-authentication |
| PIX | Geração EMV (biblioteca pix) |
| Navegação | React Navigation (Stack, Tabs, Drawer) |
| Arquitetura | Clean Architecture / DDD |
| Armazenamento Seguro | expo-secure-store (tokens) |
| Tema | AsyncStorage ou SQLite (preferência claro/escuro) |
