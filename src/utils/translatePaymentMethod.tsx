import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';

/* eslint-disable indent */
export function translatePaymentMethod(paymentMethod: PaymentMethodsDTO) {
  switch (paymentMethod) {
    case 'card':
      return 'Cartão de crédito';
    case 'boleto':
      return 'Boleto';
    case 'cash':
      return 'Dinheiro';
    case 'deposit':
      return 'Depósito Bancário';
    case 'pix':
      return 'Pix';
    default:
      return 'Cartão de crédito';
  }
}
