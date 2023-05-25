import { PaymentMethodsDTO } from './PaymentsMethodDTO';

export type NewAdDTO = {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: PaymentMethodsDTO[];
};

export type NewAdImageDTO = {
  id?: string;
  name: string;
  type: string;
  uri: string;
};

export type FullNewAdDTO = {
  newAd: NewAdDTO;
  newAdImages: NewAdImageDTO[];
};
