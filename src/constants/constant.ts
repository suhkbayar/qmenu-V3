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
