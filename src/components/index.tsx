import React from 'react';
import dynamic from 'next/dynamic';
import BannerSkelton from './Skelton/BannerSkelton';
import CardSkelton from './Skelton/CardSkelton';
import NavigationSkelton from './Skelton/NavigationSkelton';
import ListSkelton from './Skelton/ListSkelton';
import ResultSkelton from './Skelton/ResultSkelton';
import DraftCardSkelton from './Skelton/DraftCardSkelton';
import ServiceSkelton from './Skelton/ServiceSkelton';
import RankingSkelton from './Skelton/RankingSkelton';
import PromotionCardSkelton from './Skelton/PromotionCardSkelton';

export const RestaurantContent = dynamic(() => import('../layouts/Content/restaurantContent'), {
  loading: () => <CardSkelton />,
});

export const Banner = dynamic(() => import('./Banner/Banner'), {
  loading: () => <BannerSkelton />,
});

export const HistoryCard = dynamic(() => import('./Cards/HistoryCard'), {
  loading: () => <ListSkelton />,
});

export const NotificationCard = dynamic(() => import('./Cards/NotificationCard'), {
  loading: () => <ListSkelton />,
});

export const Header = dynamic(() => import('../layouts/Header/header'));

export const BottomNavigation = dynamic(() => import('./BottomNavigation/BottomNavigation'), {
  loading: () => <NavigationSkelton />,
});

export const AboutUsSidebar = dynamic(() => import('./SibeBar/AboutUs'));

export const SongList = dynamic(() => import('./List/Song'), {
  loading: () => <ListSkelton />,
});

export const SearchInput = dynamic(() => import('./Input/Search'));
export const PinInput = dynamic(() => import('./Input/PinInput'));

export const KaraokeCategories = dynamic(() => import('./Categories/KaraokeCategories'), {
  loading: () => <CardSkelton />,
});

export const RestaurantDescription = dynamic(() => import('./Informations/Restaurant'));
export const SignInForm = dynamic(() => import('./Forms/SignIn'));
export const PhoneForm = dynamic(() => import('./Forms/Phone'));
export const ConfirmationForm = dynamic(() => import('./Forms/Confirmation'));
export const FourDigits = dynamic(() => import('./Masks/FourDigitsMask'));
export const UserRegistrationForm = dynamic(() => import('./Forms/UserRegistration'));
export const PasswordResetForm = dynamic(() => import('./Forms/ForgotPassword'));
export const StepNavigation = dynamic(() => import('./BottomNavigation/StepNavigation'));
export const LoginCarousel = dynamic(() => import('./Carousel/LoginCarousel'), {
  loading: () => <BannerSkelton />,
});
export const Button = dynamic(() => import('./Button/Button'));
export const UpdateForm = dynamic(() => import('./Forms/UpdateUser'));
export const EmtySong = dynamic(() => import('./Empty/Song'));
export const Empty = dynamic(() => import('./Empty/Empty'));
export const TimeTable = dynamic(() => import('./TimeTable/index'));
export const Contacts = dynamic(() => import('./Informations/Contacts'));
export const Evaluation = dynamic(() => import('./Evaluation/index'));
export const SendFeedback = dynamic(() => import('./SibeBar/SendFeedBack'));
export const FeedbackForm = dynamic(() => import('./Forms/Feedback'));
export const ProductList = dynamic(() => import('./Products/ProductList'), {
  loading: () => <ResultSkelton />,
});
export const SearchProducts = dynamic(() => import('./SearchBar/SearchBarProducts'));
export const SearchEmpty = dynamic(() => import('./Empty/Search'));
export const ProductCard = dynamic(() => import('./Cards/ProductCard'));
export const ProductModal = dynamic(() => import('./Modal/Product'));
export const VariantCard = dynamic(() => import('./Cards/VariantCard'));
export const OptionCard = dynamic(() => import('./Cards/OptionCard'));
export const OptionValuesModal = dynamic(() => import('./Modal/OptionValues'));
export const OrderTotalButton = dynamic(() => import('./Button/OrderTotalBotton'));
export const DraftItemsModal = dynamic(() => import('./Modal/DraftItemsModal'));
export const DraftItemCard = dynamic(() => import('./Cards/DraftItemCard'), {
  loading: () => <DraftCardSkelton />,
});

export const ItemCard = dynamic(() => import('./Cards/ItemCard'), {
  loading: () => <DraftCardSkelton />,
});

export const WaiterModal = dynamic(() => import('./Modal/WaiterModal'));
export const CommentModal = dynamic(() => import('./Modal/CommentModalt'));
export const AdultsOnlyModal = dynamic(() => import('./Modal/AdultsOnlyModal'));
export const WaitPaymentModal = dynamic(() => import('./Modal/WaitPayment'));
export const PayCashierModal = dynamic(() => import('./Modal/PayCashier'));
export const SuccesOrderModal = dynamic(() => import('./Modal/SuccessOrder'));
export const UpointModal = dynamic(() => import('./Modal/UpointModal'));

export const Dining = dynamic(() => import('./OrderServices/Dining'), {
  loading: () => <ServiceSkelton />,
});
export const PreOrder = dynamic(() => import('./OrderServices/PreOrder'), {
  loading: () => <ServiceSkelton />,
});
export const Delivery = dynamic(() => import('./OrderServices/Delivery'), {
  loading: () => <ServiceSkelton />,
});
export const TakeAway = dynamic(() => import('./OrderServices/TakeAway'), {
  loading: () => <ServiceSkelton />,
});

export const PreOrderForm = dynamic(() => import('./Forms/PreOrder'));
export const DeliveryForm = dynamic(() => import('./Forms/Delivery'));
export const TakeAwayForm = dynamic(() => import('./Forms/TakeAway'));
export const VatForm = dynamic(() => import('./Forms/Vat'));

export const TotalDescription = dynamic(() => import('./Order/PayOrder/TotalDescription'));
export const InfoAlert = dynamic(() => import('./Alerts/InfoAlert'));
export const PaymentBotton = dynamic(() => import('./Button/PaymentButton'));
export const PaymentHeader = dynamic(() => import('./Order/PayOrder/PaymentHeader'));

export const QpayForm = dynamic(() => import('./Forms/PaymentForms/Qpay'));
export const BankFrom = dynamic(() => import('./Forms/PaymentForms/Bank'));
export const UpointForm = dynamic(() => import('./Forms/PaymentForms/Upoint'));
export const VoucherForm = dynamic(() => import('./Forms/PaymentForms/Voucher'));

export const OrderTypeStepper = dynamic(() => import('./Stepper/OrderType'));
export const RankingCard = dynamic(() => import('./Cards/RankingCard'), {
  loading: () => <RankingSkelton />,
});

export const RankingMdoal = dynamic(() => import('../components/Modal/RankingModal'));

export const PromotionCard = dynamic(() => import('./Cards/PromotionCard'), {
  loading: () => <PromotionCardSkelton />,
});

export const BonusCard = dynamic(() => import('./Cards/BonusCard'));
export const VoucherCard = dynamic(() => import('./Cards/VoucherCard'), {
  loading: () => <DraftCardSkelton />,
});
