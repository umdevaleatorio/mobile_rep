export interface User { id: string; name: string; email: string; phone?: string; role: 'client' | 'admin'; }
export interface Product { id: string; name: string; price: number; stock: number; categoryId: string; active: boolean; }
export interface Category { id: string; name: string; type: 'pet' | 'agro'; }
export interface CartItem { id: string; productId: string; quantity: number; productPrice: number; }
export interface Order { id: string; userId: string; status: 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled'; total: number; paymentMethod: 'pix' | 'dinheiro' | 'cartao'; }
