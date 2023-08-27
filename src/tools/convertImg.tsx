import khaan from './img/khanbank.png';
import khasBank from './img/xacbank.png';
import bogdBank from './img/bogdbank.png';
import capitronBank from './img/capitronbank.png';
import ckBank from './img/ckbank.png';
import most from './img/most.png';
import taniBank from './img/nibank.png';
import stateBank from './img/statebank.png';
import tbd from './img/tdbbank.png';
import { PAYMENT_TYPE, QPAY_BANK_TYPE, TYPE } from '../constants/constant';

import cash from './img/cash.png';
import card from './img/card.png';
import qpay from './img/qpay.png';
import monpay from './img/monpay.png';
import socialPay from './img/socialpay.png';
import toki from './img/toki.png';
import upoint from './img/upoint.png';
import unp from './img/union.png';
import { ITransaction } from '../types/transaction';

import dining from '../assets/order/dinig.svg';
import preOrder from '../assets/order/preOrder.svg';
import takeAway from '../assets/order/takeAway.svg';
import delivery from '../assets/order/delivery.svg';

export const ConvertQpayBankImg = (type: any) => {
  switch (type) {
    case QPAY_BANK_TYPE.KHAAN_BANK:
      return khaan.src;
    case QPAY_BANK_TYPE.KHAS_BANK:
      return khasBank.src;
    case QPAY_BANK_TYPE.BOGD_BANK:
      return bogdBank.src;
    case QPAY_BANK_TYPE.CAPITRON_BANK:
      return capitronBank.src;
    case QPAY_BANK_TYPE.CHINGIG_KHAAN_BANK:
      return ckBank.src;
    case QPAY_BANK_TYPE.MOST_MONEY:
      return most.src;
    case QPAY_BANK_TYPE.NATIONAL_INVESTMENT_BANK:
      return taniBank.src;
    case QPAY_BANK_TYPE.STATE_BANK:
      return stateBank.src;
    case QPAY_BANK_TYPE.TRADE_AND_DEVELOPMENT_BANK:
      return tbd.src;
    default:
      return type;
  }
};

export const ConvertBankImg = (type: any) => {
  switch (type) {
    case PAYMENT_TYPE.Cash:
      return cash.src;
    case PAYMENT_TYPE.Kart:
      return card.src;
    case PAYMENT_TYPE.QPay:
      return qpay.src;
    case PAYMENT_TYPE.MonPay:
      return monpay.src;
    case PAYMENT_TYPE.SocialPay:
      return socialPay.src;
    case PAYMENT_TYPE.Toki:
      return toki.src;
    case PAYMENT_TYPE.UPT:
    case PAYMENT_TYPE.Upoint:
      return upoint.src;
    case PAYMENT_TYPE.MNQ:
      return monpay.src;
    case PAYMENT_TYPE.UNP:
      return unp.src;

    default:
      return type;
  }
};

export const ConvertImgUrl = (transaction: ITransaction) => {
  switch (transaction.type) {
    case PAYMENT_TYPE.SocialPay:
      return transaction.image;

    default:
      return `data:image/jpeg;base64,${transaction.image} `;
  }
};

export const ConvertOrderType = (type: any) => {
  switch (type) {
    case TYPE.DINIG:
      return dining.src;
    case TYPE.PRE_ORDER:
      return preOrder.src;
    case TYPE.DELIVERY:
      return delivery.src;
    case TYPE.TAKE_AWAY:
      return takeAway.src;
    default:
      return type;
  }
};
