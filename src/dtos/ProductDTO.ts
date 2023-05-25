import { PaymentMethodsDTO } from './PaymentsMethodDTO';

export type ProductDTO = {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: PaymentMethodsDTO[];
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductImageDTO = {
  id: string;
  path: string;
};

export type FullProductDTO = {
  product: ProductDTO;
  productImages: ProductImageDTO[];
};
