export enum SystemType {
  C = 'C', //Customer
  M = 'M', //Merchant
  A = 'A', //Administrator
  S = 'S', //System
  T = 'T', //Toki
  B = 'B', //Buyer
  P = 'P', //Partner
  MA = 'MA', // Mbank App
}

export const PAYMENT_TYPE = {
  QPay: 'QPay',
  QPay2: 'QPay2',
  MonPay: 'MonPay',
  SocialPay: 'SocialPay',
  Toki: 'Toki',
  Cash: 'Cash',
  Kart: 'Card',
  Upoint: 'Upoint',
  UPT: 'UPT', //Upoint
  CTE: 'CTE',
  MNQ: 'MNQ',
  UNP: 'UNP',
  VCR: 'VCR',
  MBK: 'MBK',
};

export const QPAY_BANK_TYPE = {
  MBANK: 'M bank',
  KHAAN_BANK: 'Khan bank',
  SOCIAL_PAY: 'Social Pay',
  BOGD_BANK: 'Bogd bank',
  CAPITRON_BANK: 'Capitron bank',
  CHINGIG_KHAAN_BANK: 'Chinggis khaan bank',
  MOST_MONEY: 'Most money',
  NATIONAL_INVESTMENT_BANK: 'National investment bank',
  STATE_BANK: 'State bank',
  TRADE_AND_DEVELOPMENT_BANK: 'Trade and Development bank',
  KHAS_BANK: 'Xac bank',
  MONPAY: 'Monpay',
  ARIG_BANK: 'Arig bank',
  ARD_APP: 'Ard App',
  TRANS_BANK: 'Trans bank',
};

export const DRAFT_TYPE = {
  DRAFT: 'DRAFT',
  NEW: 'NEW', //Хүлээгдэж байна
  ACCEPTED: 'ACCEPTED', //Хүлээн авсан
  COOKING: 'COOKING', //Хоол хийгдэж байна
  READY: 'READY', //Хоол бэлэн болсон
  COMPLETED: 'COMPLETED', //Хоол хүлээн авсан
  CANCELLED: 'CANCELLED', //Хоол цуцалсан
  RETURN: 'RETURN', //Хоол буцаасан
  PROCESSING: 'PROCESSING',
  PREPARING: 'PREPARING',
  PREPARED: 'PREPARED',
  DELIVERING: 'DELIVERING',
  PICKEDUP: 'PICKEDUP',
  MOVED: 'MOVED',
};

export const TYPE = {
  DINIG: 'Dining',
  PRE_ORDER: 'PreOrder',
  TAKE_AWAY: 'TakeAway',
  DELIVERY: 'Delivery',
  MOVE: 'Moved',
};

export const ACTIVE_STATES = ['COMPLETED', 'CANCELLED'];

export const DATE_FORMAT = 'YYYY-MM-DD';
export const YEAR_FORMAT = 'YYYY';
export const PATTERN_CODE = '[0-9]{1}'; // Pattern for four digits

export enum MenuItemState {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SOLD_OUT = 'SOLD_OUT',
}

export enum DayOfWeek {
  Sunday = 'sun',
  Monday = 'mon',
  Tuesday = 'tue',
  Wednesday = 'wed',
  Thursday = 'thu',
  Friday = 'fri',
  Saturday = 'sat',
}

export enum CustomerAccountType {
  TKI = 'TKI', //Toki
  UPT = 'UPT', //U-Point
  MNP = 'MNP', //Monpay
}

export enum LoyaltyType {
  U = 'U', //U-point
}

export enum NotificationActionType {
  P = 'P', // Primary
  S = 'S', // Secondary
  L = 'L', // Link
}

export enum NotificationType {
  WARNING = 'WARNING',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const qmenuConfigs = [
  {
    name: 'menuTheme',
    value: 'MENU_THEME',
  },
  {
    name: 'hideImage',
    value: 'HIDE_IMAGE',
  },
  {
    name: 'loginRequired',
    value: 'LOGIN_REQUIRED',
  },
  {
    name: 'backgroundColor',
    value: 'BACKGROUND_COLOR',
  },
  {
    name: 'textColor',
    value: 'TEXT_COLOR',
  },
  {
    name: 'buttonText',
    value: 'BUTTON_TEXT',
  },
  {
    name: 'cardBackgroundColor',
    value: 'CARD_BACKGROUND_COLOR',
  },
  {
    name: 'navbarBackgroundColor',
    value: 'NAVBAR_BACKGROUND_COLOR',
  },
  {
    name: 'noCheckout',
    value: 'NO_CHECKOUT',
  },
  {
    name: 'hidePrice',
    value: 'HIDE_PRICE',
  },
];

export enum ChannelType {
  S = 'S', //System
  P = 'P', //Point of Sale
  Q = 'Q', //QR Menu
  W = 'W', //Web
  K = 'K', //Kiosk
  A = 'A', //Application
  T = 'T', //Toki - Food Delivery
  F = 'F', //Facebook
  G = 'G', //Gastro
  C = 'C', //FB Chat
  M = 'M', //Monpay
  U = 'U', //UBEats
  I = 'I', //API
  MR = 'MR', // Market
  MB = 'MB', // MBank
  PL = 'PL', // Public
}

export enum PaymentType {
  Cash = 'Cash', //CSH
  Card = 'Card', //CRD
  QPay = 'QPay', //QPY
  QPay2 = 'QPay2', //QPY v2
  MonPay = 'MonPay', //MNP
  SocialPay = 'SocialPay', //SLP
  Toki = 'Toki', //TKI
  Account = 'Account', //ACC
  Invoice = 'Invoice', //INV
  Upoint = 'Upoint', //UPT

  UPT = 'UPT', //U-Point
  CSH = 'CSH', //Cash
  CRD = 'CRD', //Card
  GLP = 'GLP', //GLMTPOS
  QPY = 'QPY', //QPay
  QP2 = 'QP2', //QPay v2
  MNP = 'MNP', //MonPay
  MNQ = 'MNQ', //MonPay QR
  SLP = 'SLP', //SocialPay
  TKI = 'TKI', //Toki
  TKL = 'TKL', //Toki lunch
  TKP = 'TKP', //Toki promo
  CUP = 'CUP', //Coupon
  VCR = 'VCR', //Voucher
  GFT = 'GFT', //Gift Card
  LOY = 'LOY', //Loyalty
  CTE = 'CTE', //Canteen employee
  MBK = 'MBK', //M-Bank
  UNP = 'UNP', //UnionPay
  UBE = 'UBE', //UBEats
}

export const PartnerObjType: {
  [k in SystemType]?: {
    type: SystemType;
    channel: ChannelType;
    payment: PaymentType;
    name: string;
    menu: string;
  };
} = {
  [SystemType.MA]: { type: SystemType.MA, channel: ChannelType.MB, payment: PaymentType.MBK, name: 'Mbank', menu: 'B' },
};
