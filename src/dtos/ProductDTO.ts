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

export type DatabaseProductImageDTO = {
  id: string;
  path: string;
};

export type DatabasePaymentMethodsDTO = {
  id?: string;
  key: string;
  name: string;
};

export type DatabaseProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_images: DatabaseProductImageDTO[];
  payment_methods: DatabasePaymentMethodsDTO[];
  user: {
    avatar: string;
    name: string;
    tel: string;
  };
};
