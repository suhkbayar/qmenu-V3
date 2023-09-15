import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { GET_CUSTOMER_PRODUCTS } from '../../graphql/query';
import { getButton } from '../Cards/VoucherCard';
import { CORRECTION_TRANSACTION } from '../../graphql/mutation/order';
import { useNotificationContext } from '../../providers/notification';
import { NotificationType } from '../../constants/constant';
import ListSkelton from '../Skelton/ListSkelton';

type Props = {
  loading: boolean;
  transaction: any;
  order: any;
  onUpdateOrder: (update: boolean) => void;
};

const Index = ({ loading, order, transaction, onUpdateOrder }: Props) => {
  const { showNotification, showCustomNotification } = useNotificationContext();

  const { data, refetch } = useQuery(GET_CUSTOMER_PRODUCTS, { fetchPolicy: 'network-only' });

  const [returnTransaction, { loading: returning }] = useMutation(CORRECTION_TRANSACTION, {
    onCompleted: async (data) => {
      onUpdateOrder(data);
      refetch();
    },
    onError(err) {
      showNotification(NotificationType.ERROR, err.message);
    },
  });
  let product = data?.getCustomerProducts?.find((e) => e.id === transaction?.code);

  if (
    (product?.state !== 'READY' && order.state !== 'NEW') ||
    transaction.state === 'CANCELLED' ||
    order.state !== 'ACCEPTED'
  )
    return null;

  if (returning) return <ListSkelton />;

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() =>
        returnTransaction({
          variables: {
            id: product?.transaction,
            reason: 'Voucher returned',
          },
        })
      }
      className="w-14 h-4 text-xs flex justify-center place-self-center bg-current  rounded-lg cursor-pointer"
    >
      {getButton(product?.state)}
    </button>
  );
};

export default Index;
