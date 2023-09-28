import React, { useContext, useEffect } from 'react';
import { useSubscription, useLazyQuery } from '@apollo/client';
import { ON_TRACK_ORDER } from '../graphql/subscription/order';
import { IOrder } from '../types';
import { GET_LOYALTIES_RECORDS, GET_ORDER, GET_ORDERS } from '../graphql/query';
import { AuthContext, getPayload } from './auth';
import { ON_UPDATED_CUSTOMER_NOTIFICATION } from '../graphql/subscription';
import { useNotificationContext } from './notification';
import { INotification } from '../types/notification';

const SubscriptionProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [getLoyaltiesRecords, { refetch }] = useLazyQuery(GET_LOYALTIES_RECORDS);

  const { showLoyaltyNotification, setNotificationState, notificationState, showOrderNotification } =
    useNotificationContext();

  let customerId: string;

  if (isAuthenticated) {
    customerId = getPayload()?.sub;
  }

  useSubscription(ON_TRACK_ORDER, {
    variables: { customer: customerId },
    skip: !customerId,
    onData({ client, data }) {
      if (!data) return;
      const caches = client.readQuery<{ getOrders: IOrder[] }>({ query: GET_ORDERS });
      if (!caches?.getOrders) return;

      const { event, order: subscriptionOrder } = data.data.onTrackOrder;
      const updatedOrders = caches.getOrders.map((order) =>
        order.id === subscriptionOrder.id ? subscriptionOrder : order,
      );

      if (subscriptionOrder.state === 'PREPARED' || subscriptionOrder.state === 'COMPLETED') {
        if (subscriptionOrder.type === 'Dining') {
          showOrderNotification(subscriptionOrder.id);
          setTimeout(refetch, 6000);
        }
      }

      switch (event) {
        case 'CREATED':
        case 'UPDATED':
          if (!updatedOrders.find((order) => order.id === subscriptionOrder.id)) {
            updatedOrders.push(subscriptionOrder);
          }
          client.writeQuery({
            query: GET_ORDER,
            data: {
              getOrder: updatedOrders.find((order) => order.id === subscriptionOrder.id),
            },
          });
          break;
        case 'DELETE':
          client.writeQuery({
            query: GET_ORDERS,
            data: { getOrders: updatedOrders.filter((order) => order.id !== subscriptionOrder.id) },
          });
          break;
        default:
          return;
      }

      client.writeQuery({
        query: GET_ORDERS,
        data: { getOrders: updatedOrders },
      });
    },
  });

  useSubscription(ON_UPDATED_CUSTOMER_NOTIFICATION, {
    variables: { customer: customerId },
    skip: !customerId,
    onData({ client: _, data }) {
      const notification: INotification = data?.data?.onUpdatedCustomerNotification?.notification;
      if (!notification?.data) return;
      const notificationData = JSON.parse(notification.data);
      showLoyaltyNotification(
        notificationData.type,
        'Мэдэгдэл',
        notificationData.message?.statusMessage || '',
        notificationData.type === 'G' ? notificationData.group : notificationData.product?.image,
        notification.actions,
      );

      const newNotification = notificationState.notifications.find((item) => item.sk === notification.sk);

      if (!newNotification)
        setNotificationState({
          ...notificationState,
          notifications: [notification, ...notificationState.notifications],
        });
    },
  });

  useEffect(() => {
    // Clean up the subscription when the component unmounts
    return () => {
      // Unsubscribe or perform any necessary cleanup
    };
  }, []);

  return <>{children}</>;
};

export default SubscriptionProvider;
