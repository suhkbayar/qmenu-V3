import React, { createContext, useContext, useMemo, useState } from 'react';
import { NotificationType } from '../constants/constant';
import { INotification, INotificationAction } from '../types/notification';
import { NotificationModal } from '../helpers/notification';
import { LoyaltyModal } from '../helpers/notification/loyalty';
import { useLazyQuery, useMutation } from '@apollo/client';
import { READ_NOTIFICATION } from '../graphql/mutation/notification';
import { GET_NOTIFICATIONS } from '../graphql/query';
import { OrderModal } from '../components/Modal/Order';

interface NotificationsState {
  notifications: INotification[];
  nextToken: string;
  hasMore: boolean;
}

interface NotificationState {
  visible: boolean;
  orderVisible: boolean;
  orderId: string;
  type: NotificationType;
  title?: string;
  message?: string;
  actions?: INotificationAction[];
  loyaltyVisible?: boolean;
  loyaltyType?: string;
  loyaltyImage?: string;
}

const initialState = {
  visible: false,
  orderVisible: false,
  orderId: null,
  type: null,
  title: '',
  message: '',
  actions: null,
  loyaltyVisible: false,
  loyaltyType: 'G',
  loyaltyImage: null,
};

type NotificationContextType = {
  notificationState: NotificationsState;
  setNotificationState: any;
  loadingGetNotifications: boolean;
  loadingMarkAsRead: boolean;
  getNotifications: (options: any) => void;
  refetch: () => void;
  markAsRead: (item: INotification) => void;
  showNotification: (type: NotificationType, message?: string) => void;
  showCustomNotification: (
    title: string,
    message: string,
    type?: NotificationType,
    actions?: INotificationAction[],
  ) => void;
  showOrderNotification: (orderId: string) => void;
  showLoyaltyNotification: (
    type: string,
    title: string,
    message: string,
    logo: string,
    actions?: INotificationAction[],
  ) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }: any) => {
  const [state, setState] = useState<NotificationState>(initialState);
  const [notificationState, setNotificationState] = useState<NotificationsState>({
    notifications: [],
    nextToken: null,
    hasMore: true,
  });

  const [getNotifications, { loading: loadingGetNotifications }] = useLazyQuery<{
    getNotifications: { notifications: INotification[]; nextToken: string };
  }>(GET_NOTIFICATIONS, {
    fetchPolicy: 'cache-first',
    variables: {
      limit: 10,
      nextToken: notificationState.nextToken,
    },
    onCompleted(data) {
      if (notificationState.hasMore) {
        const noti = data?.getNotifications;
        if (noti?.notifications?.length >= 10) {
          setNotificationState((prevState) => ({
            ...prevState,
            nextToken: noti.nextToken,
            notifications: prevState.notifications.concat(
              noti.notifications.filter((item) => !prevState.notifications.find((e) => e.sk === item.sk)),
            ),
            hasMore: true,
          }));
        } else {
          setNotificationState((prevState) => ({
            ...prevState,
            notifications: prevState.notifications.concat(
              noti.notifications.filter((item) => !prevState.notifications.find((e) => e.sk === item.sk)),
            ),
            hasMore: false,
          }));
        }
      }
    },
  });

  const refetch = () => getNotifications({ variables: { limit: 10, nextToken: notificationState.nextToken } });

  const [readNotification, { loading: loadingMarkAsRead }] = useMutation(READ_NOTIFICATION);

  const markAsRead = (item: INotification) => {
    const sk = item.sk;
    if (!item.isRead) {
      readNotification({
        variables: { sk },
      });
      let notification = notificationState.notifications.find((e) => e.sk === sk);
      if (notification) {
        let updatedNotification = { ...notification, isRead: true };
        let updatedNotifications = notificationState.notifications.map((e) => (e.sk === sk ? updatedNotification : e));
        setNotificationState((prevState) => ({
          ...prevState,
          notifications: updatedNotifications,
        }));
      }
    }
  };

  const showNotification = (type: NotificationType = NotificationType.SUCCESS, message: string = '') => {
    let title: string = '';
    switch (type) {
      case NotificationType.SUCCESS:
        title = 'Амжилттай';
        break;
      case NotificationType.ERROR:
        title = 'Алдаа';
        break;
      case NotificationType.INFO:
        title = 'Мэдэгдэл';
        break;
      case NotificationType.WARNING:
        title = 'Анхааруулга';
        break;
    }
    setState({ ...state, type, title, message, visible: true });
  };

  const showCustomNotification = (
    title: string = '',
    message: string = '',
    type?: NotificationType,
    actions: INotificationAction[] = [],
  ) => {
    setState({ ...state, type, title, message, visible: true, actions });
  };

  const showOrderNotification = (orderId: string = '') => {
    setState({ ...state, orderId: orderId, orderVisible: true });
  };

  const showLoyaltyNotification = (
    type: string,
    title: string = 'Мэдэгдэл',
    message: string = '',
    image: string = null,
    actions: INotificationAction[] = [],
  ) => {
    setState({ ...state, loyaltyType: type, title, message, loyaltyImage: image, loyaltyVisible: true, actions });
  };

  const onClose = () => setState(initialState);

  const contextValue = useMemo(
    () => ({
      notificationState,
      loadingGetNotifications,
      loadingMarkAsRead,
      getNotifications,
      refetch,
      markAsRead,
      setNotificationState,
      showNotification,
      showCustomNotification,
      showLoyaltyNotification,
      showOrderNotification,
    }),
    [state, notificationState, loadingMarkAsRead, loadingGetNotifications],
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationModal
        visible={state.visible}
        alertType={state.type}
        message={state.message}
        title={state.title}
        onClose={() => onClose()}
        actions={state.actions}
      />
      <LoyaltyModal
        image={state.loyaltyImage}
        type={state.loyaltyType}
        visible={state.loyaltyVisible}
        message={state.message}
        title={state.title}
        onClose={() => onClose()}
        actions={state.actions}
      />
      <OrderModal orderId={state.orderId} orderVisible={state.orderVisible} onClose={() => onClose()} />
    </NotificationContext.Provider>
  );
};
