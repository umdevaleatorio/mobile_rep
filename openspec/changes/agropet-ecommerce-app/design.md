# Design — AgroPet Lambari

## Arquitetura Geral

O projeto segue **Clean Architecture** com **DDD (Domain-Driven Design)** conforme requisito da disciplina.

```
src/
├── domain/                    # Camada de domínio (entities + use cases)
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   ├── CartItem.ts
│   │   ├── Order.ts
│   │   ├── OrderItem.ts
│   │   ├── Competitor.ts
│   │   └── StoreSettings.ts
│   ├── value-objects/
│   │   ├── Email.ts
│   │   ├── Price.ts
│   │   ├── Coordinates.ts
│   │   ├── DeliveryRadius.ts
│   │   └── PaymentMethod.ts
│   └── use-cases/
│       ├── auth/
│       │   ├── LoginUseCase.ts
│       │   ├── RegisterUseCase.ts
│       │   ├── BiometricAuthUseCase.ts
│       │   └── CheckSessionUseCase.ts
│       ├── products/
│       │   ├── ListProductsUseCase.ts
│       │   ├── GetProductUseCase.ts
│       │   ├── CreateProductUseCase.ts  (admin)
│       │   ├── UpdateProductUseCase.ts  (admin)
│       │   ├── DeleteProductUseCase.ts  (admin)
│       │   ├── ActivateProductUseCase.ts  (admin)
│       │   └── DeactivateProductUseCase.ts  (admin)
│       ├── cart/
│       │   ├── AddToCartUseCase.ts
│       │   ├── RemoveFromCartUseCase.ts
│       │   ├── UpdateCartItemUseCase.ts
│       │   ├── GetCartUseCase.ts
│       │   └── ClearCartUseCase.ts
│       ├── orders/
│       │   ├── CreateOrderUseCase.ts
│       │   ├── ListOrdersUseCase.ts
│       │   ├── ListClientOrdersUseCase.ts
│       │   ├── UpdateOrderStatusUseCase.ts  (admin)
│       │   └── CancelOrderUseCase.ts  (admin)
│       ├── sales/
│       │   ├── GetDashboardUseCase.ts   (admin)
│       │   └── GetSalesHistoryUseCase.ts (admin)
│       ├── location/
│       │   ├── GetUserLocationUseCase.ts
│       │   └── CheckDeliveryRadiusUseCase.ts
│       └── settings/
│           ├── GetThemeUseCase.ts
│           ├── SetThemeUseCase.ts
│           └── UpdateStoreSettingsUseCase.ts (admin)
│
├── data/                      # Camada de dados
│   ├── repositories/
│   │   ├── SupabaseProductRepo.ts
│   │   ├── SupabaseUserRepo.ts
│   │   ├── SupabaseOrderRepo.ts
│   │   ├── SupabaseCompetitorRepo.ts
│   │   ├── SupabaseStoreSettingsRepo.ts
│   │   ├── SQLiteProductRepo.ts   (cache offline)
│   │   ├── SQLiteOrderRepo.ts     (cache offline)
│   │   └── SQLiteCartRepo.ts      (carrinho persistido)
│   └── datasources/
│       ├── supabase/
│       │   └── client.ts
│       └── sqlite/
│           └── database.ts
│
├── presentation/              # Camada de apresentação
│   ├── navigation/
│   │   ├── AppNavigator.tsx       # Root navigator (Splash → Auth ou Main)
│   │   ├── AuthStack.tsx          # Login Cliente, Login Admin, Register
│   │   ├── ClientTabs.tsx         # Bottom tabs (cliente)
│   │   ├── AdminDrawer.tsx        # Drawer (admin)
│   │   ├── ProductStack.tsx       # Detalhes produto
│   │   ├── CheckoutStack.tsx      # Pagamento → Confirmação
│   │   └── SettingsStack.tsx      # Configurações
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── auth/
│   │   │   ├── ClientLoginScreen.tsx
│   │   │   ├── AdminLoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── client/
│   │   │   ├── HomeScreen.tsx           # Menu Inicial / Catálogo
│   │   │   ├── ProductDetailScreen.tsx  # Detalhes do Produto
│   │   │   ├── CartScreen.tsx           # Carrinho
│   │   │   ├── PaymentScreen.tsx        # Pagamento e Frete
│   │   │   ├── PaymentConfirmScreen.tsx # Confirmação (QR Code PIX se aplicável)
│   │   │   ├── OrderHistoryScreen.tsx   # Histórico de Pedidos do cliente
│   │   │   ├── OrderTrackingScreen.tsx  # Acompanhar Pedido (timeline + detalhes)
│   │   │   ├── MapScreen.tsx            # Mapa/Geolocalização
│   │   │   ├── ProfileScreen.tsx        # Perfil do Usuário
│   │   │   └── SettingsScreen.tsx       # Configurações do cliente
│   │   └── admin/
│   │       ├── AdminHomeScreen.tsx        # Menu Inicial (Admin)
│   │       ├── OrdersScreen.tsx           # Tela de Pedidos
│   │       ├── SalesDashboardScreen.tsx   # Painel de Vendas (Dashboard)
│   │       ├── SalesHistoryScreen.tsx     # Histórico de Vendas / Caixa
│   │       ├── ManageProductsScreen.tsx   # Registrar/Remover/Desativar Produto
│   │       ├── ProductFormScreen.tsx      # Formulário de produto (novo/editar)
│   │       ├── AdminMapScreen.tsx         # Mapa/Geolocalização (Admin)
│   │       ├── AdminProfileScreen.tsx     # Perfil (Admin)
│   │       ├── AdminSettingsScreen.tsx    # Configurações (Admin)
│   │       ├── OfflineModeScreen.tsx      # Modo Offline (Admin)
│   │       └── ManageCategoriesScreen.tsx # Gerenciar Categorias
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── CartItemRow.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── PixQRCode.tsx          # QR Code + Código Copia e Cola
│   │   ├── PaymentMethodSelector.tsx  # Seletor PIX / Dinheiro / Cartão
│   │   ├── ScanFromGallery.tsx
│   │   ├── MapMarker.tsx
│   │   ├── OrderStatusBadge.tsx
│   │   ├── SalesChart.tsx         # Gráfico para Dashboard
│   │   ├── ThemeToggle.tsx        # Toggle claro/escuro
│   │   └── OfflineBanner.tsx      # Banner indicador de modo offline
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   └── ThemeContext.tsx
│   └── theme/
│       ├── lightTheme.ts
│       └── darkTheme.ts
│
└── utils/
    ├── pixGenerator.ts        # Geração do payload PIX EMV
    ├── locationHelper.ts      # Verificação raio 17km
    ├── syncManager.ts         # Gerenciador de sincronização offline
    └── constants.ts           # Coordenadas Lambari, raio, etc.
```

## Entidades do Domínio

### User
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string (UUID) | ID do Supabase Auth |
| name | string | Nome completo |
| email | Email (VO) | E-mail validado |
| phone | string | Telefone |
| address | string | Endereço completo |
| city | string | Cidade |
| cep | string | CEP |
| coordinates | Coordinates (VO) | Lat/Lng |
| role | "client" \| "admin" | Papel no sistema |

### Product
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string (UUID) | Identificador |
| name | string | Nome do produto |
| description | string | Descrição |
| price | Price (VO) | Preço em R$ |
| imageUrl | string | URL da imagem (Supabase Storage) |
| categoryId | string | FK para Category |
| stock | number | Quantidade em estoque |
| mercadoLivreUrl | string? | Link ML (opcional) |
| active | boolean | Se está ativo no catálogo |

### Category
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string (UUID) | Identificador |
| name | string | Nome (ex: "Rações") |
| type | "pet" \| "agro" | Segmento |

### CartItem (Persistido no SQLite)
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | Identificador local |
| productId | string | FK para Product |
| productName | string | Nome (snapshot) |
| productPrice | Price (VO) | Preço (snapshot) |
| productImageUrl | string | Imagem (snapshot) |
| quantity | number | Quantidade |

### Order
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string (UUID) | Identificador |
| userId | string | FK para User |
| status | "pending" \| "confirmed" \| "preparing" \| "delivering" \| "completed" \| "cancelled" | Status |
| total | Price (VO) | Valor total |
| deliveryType | "local" \| "pickup" \| "mercado_livre" | Tipo de entrega |
| paymentMethod | "pix" \| "dinheiro" \| "cartao_credito" \| "cartao_debito" | Forma de pagamento |
| deliveryAddress | string? | Endereço de entrega |
| coordinates | Coordinates? | Coordenadas da entrega |
| pixPayload | string? | Payload EMV do PIX (quando PIX) |
| needsChange | string? | "Troco para quanto?" (quando dinheiro) |
| createdAt | Date | Data do pedido |
| updatedAt | Date | Data da última atualização de status |

### OrderItem
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | Identificador |
| orderId | string | FK para Order |
| productId | string | FK para Product |
| quantity | number | Quantidade |
| unitPrice | Price (VO) | Preço unitário no momento |

### Competitor
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | Identificador |
| name | string | Nome da loja |
| address | string | Endereço |
| coordinates | Coordinates (VO) | Lat/Lng |
| phone | string? | Telefone |

### OrderMessage
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string (UUID) | Identificador |
| orderId | string | FK para Order |
| status | string | Status no momento da mensagem |
| reason | string | Motivo (ex: "Atraso na entrega", "Pagamento cancelado") |
| message | string | Corpo da mensagem ao cliente |
| createdAt | Date | Data/hora do envio |

### StoreSettings
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | string | Identificador |
| deliveryRadiusKm | number | Raio de entrega (padrão 17km) |
| openingTime | string | Horário de abertura |
| closingTime | string | Horário de fechamento |
| pixKey | string | Chave PIX |
| pixReceiverName | string | Nome do recebedor |
| pixReceiverCity | string | Cidade do recebedor |

## Banco de Dados (Supabase)

```sql
-- Tabelas principais no Supabase (PostgreSQL)
users (id, name, email, phone, address, city, cep, lat, lng, role)
categories (id, name, type)
products (id, name, description, price, image_url, category_id, stock, mercado_livre_url, active)
orders (id, user_id, status, total, delivery_type, payment_method, delivery_address, lat, lng, pix_payload, needs_change, created_at, updated_at)
order_items (id, order_id, product_id, quantity, unit_price)
order_messages (id, order_id, status, reason, message, created_at)
competitors (id, name, address, lat, lng, phone)
store_settings (id, delivery_radius_km, opening_time, closing_time, pix_key, pix_receiver_name, pix_receiver_city)
```

## Banco Local (SQLite)

```sql
-- Tabelas SQLite para cache e persistência local
products_cache (id, name, description, price, image_local_path, category_id, stock, active, synced_at)
cart_items (id, product_id, product_name, product_price, product_image_url, quantity)
orders_cache (id, user_id, status, total, payment_method, delivery_type, created_at, synced_at)
user_preferences (key, value)  -- tema, endereço padrão, etc.
sync_queue (id, operation, table_name, data_json, created_at)  -- fila offline
```

## Fluxo de Navegação

```
App Start
  │
  └─▶ SplashScreen (logo AgroPet + verificação de sessão)
       │
       ├─ Sem sessão ──▶ AuthStack
       │                   ├── ClientLoginScreen ◄──── tela principal
       │                   │     ├── [link] → RegisterScreen
       │                   │     └── [link] → AdminLoginScreen
       │                   ├── AdminLoginScreen
       │                   │     ├── Login + Biometria → AdminDrawer
       │                   │     └── [link] → voltar ClientLoginScreen
       │                   └── RegisterScreen
       │                         └── Cadastro → ClientTabs
       │
       └─ Com sessão válida
            │
            ├─ role: "client" ──▶ ClientTabs (Bottom Tabs)
            │    ├── 🏠 Home (Catálogo)
            │    │     └── ProductDetailScreen → [Adicionar ao carrinho]
            │    ├── 🛒 Carrinho
            │    │     └── PaymentScreen (Pagamento + Frete)
            │    │           ├── PIX → PaymentConfirmScreen (QR Code + Copia e Cola)
            │    │           ├── Dinheiro → PaymentConfirmScreen (sem QR)
            │    │           └── Cartão → PaymentConfirmScreen (sem QR)
            │    ├── 🗺️ Mapa (loja, concorrentes, acompanhar entrega)
            │    └── 👤 Perfil
            │          ├── OrderHistoryScreen (Histórico de Pedidos)
            │          │     └── OrderTrackingScreen (Acompanhar Pedido — timeline + detalhes)
            │          └── SettingsScreen (Configurações)
            │                ├── Tema claro/escuro
            │                ├── Endereço padrão
            │                ├── Notificações
            │                └── Logout
            │
            └─ role: "admin" ──▶ AdminDrawer
                 ├── 📋 Pedidos (gerenciar status)
                 ├── 📊 Painel de Vendas (Dashboard)
                 ├── 💰 Histórico de Vendas / Caixa (dia/semana/mês)
                 ├── 📦 Gerenciar Produtos (CRUD + ativar/desativar)
                 ├── 🗺️ Mapa (entregas em andamento, concorrentes)
                 ├── 👤 Perfil (Admin)
                 └── ⚙️ Configurações (Admin)
                       ├── Tema claro/escuro
                       ├── Chave PIX
                       ├── Raio de entrega / Horário
                       ├── Gerenciar Categorias
                       ├── Modo Offline (status, forçar sync)
                       └── Logout
```

## Geolocalização — Regra de Entrega

- Centro de Lambari: **-21.9686, -45.3464**
- Raio máximo: **17km** (configurável pelo admin)
- Cálculo via fórmula de Haversine
- Se `distância(user, centro) <= 17km` → entrega local disponível
- Se `distância > 17km` → mostrar opção "Retirar na loja" ou Mercado Livre

## Formas de Pagamento

| Método | Comportamento | QR Code? |
|--------|--------------|----------|
| **PIX** | Gera QR Code EMV + Código Copia e Cola | ✅ Sim |
| **Dinheiro** | Registra intenção, pagamento na entrega/retirada | ❌ Não |
| **Cartão Crédito** | Registra intenção, pagamento na maquininha | ❌ Não |
| **Cartão Débito** | Registra intenção, pagamento na maquininha | ❌ Não |

## PIX QR Code

- Padrão: **EMV/BRCode** (BR Code conforme BACEN)
- Chave PIX configurável pelo admin (via Configurações)
- Payload inclui: chave, nome recebedor, cidade (Lambari), valor, txid
- QR Code exibido na tela de confirmação + código Copia e Cola abaixo
- Botão "Copiar Código PIX" copia o payload para a área de transferência
- Biblioteca sugerida: `react-native-pix` ou geração manual do payload EMV

## Autenticação

### Login do Cliente (tela separada)
- Login com email + senha via Supabase Auth
- Se `role === "client"` → redireciona para ClientTabs
- Se `role === "admin"` → redireciona para tela de login admin (solicita biometria)

### Login do Admin (tela separada)
- Login com email + senha via Supabase Auth
- Após login, se `role === "admin"`:
  - Solicita biometria via `expo-local-authentication`
  - Face ID / fingerprint / face unlock do dispositivo
  - Se biometria falhar → não libera acesso admin
  - Se dispositivo sem biometria → fallback para PIN/senha adicional

## Tema Claro/Escuro

- Disponível para **cliente e admin**
- Preferência salva localmente (AsyncStorage ou SQLite)
- `ThemeContext` global que aplica o tema em toda a interface
- Dois arquivos de tema: `lightTheme.ts` e `darkTheme.ts`

## Carrinho Persistido

- Itens do carrinho salvos no **SQLite** (não apenas em memória)
- Sobrevive ao fechamento do app
- Não é limpo após logout (o cliente pode voltar e encontrar seus itens)
- Limpo **somente** após confirmação de pedido com sucesso
