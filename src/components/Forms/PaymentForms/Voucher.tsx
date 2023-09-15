import { useMutation, useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { VoucherCard } from '../..';
import { GET_CUSTOMER_PRODUCTS } from '../../../graphql/query';
import voucher from '../../../assets/user/voucher.svg';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { NotificationType } from '../../../constants/constant';
import { useNotificationContext } from '../../../providers/notification';
import { CORRECTION_TRANSACTION, GET_PAY_ORDER } from '../../../graphql/mutation/order';
import { TransactionInput } from '../../../types';

type Props = {
  id: string;
  watch: any;
  order: string;
  onUpdateOrder: (data: any) => void;
  onFinish: (finish: boolean) => void;
};

const Index = ({ onUpdateOrder, id, watch, order, onFinish }: Props) => {
  const paymentId = watch('paymentId');
  const paymentCode = watch('paymentCode');

  const [isShow, setIsShow] = useState(false);

  const { data, refetch } = useQuery(GET_CUSTOMER_PRODUCTS, { fetchPolicy: 'network-only' });

  let products: any[] = (data?.getCustomerProducts || []).filter((product) => {
    if (product.state === 'ACTIVE') {
      return true;
    } else if (product.state === 'READY') {
      if (product?.spentOrder === order) return true;
      else return false;
    }
    return false;
  });

  useEffect(() => {
    if (paymentId !== id) {
      setIsShow(false);
    }
  }, [paymentId]);

  const onExpand = () => {
    setIsShow(!isShow);
  };

  // const onSelectVoucher = (code) => {
  //   onSelect(PAYMENT_TYPE.VCR, code);
  // };

  const { showNotification, showCustomNotification } = useNotificationContext();

  const [payOrderByPayment, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: async (data) => {
      onUpdateOrder(data);
      refetch();
      if (data.payOrder.order.paymentState === 'PAID') {
        onFinish(true);
      }
    },
    onError(err) {
      showNotification(NotificationType.ERROR, err.message);
    },
  });

  const [returnTransaction, { loading: returning }] = useMutation(CORRECTION_TRANSACTION, {
    onCompleted: async (data) => {
      onUpdateOrder(data);
      refetch();
    },
    onError(err) {
      showNotification(NotificationType.ERROR, err.message);
    },
  });

  const onChangeState = async (voucher, state) => {
    switch (state) {
      case 'ACTIVE':
        let input: TransactionInput = {
          order: order,
          buyer: '',
          register: '',
          vatType: 1,
          payment: id,
          confirm: false,
          code: voucher.id,
          amount: 0,
        };

        payOrderByPayment({
          variables: {
            input: input,
          },
        });
        break;
      case 'READY':
        returnTransaction({
          variables: {
            id: voucher.transaction,
            reason: 'Voucher returned',
          },
        });
        break;
      default:
        break;
    }
  };

  if (returning) return null;

  return (
    <>
      {data && (
        <div
          className={`w-full bg-white rounded-lg p-2 mt-4  border ${
            paymentId === id ? 'border-current' : ' border-white'
          } `}
        >
          <div className="flex place-items-center place-content-between p-1" onClick={() => onExpand()}>
            <div className="flex gap-2 place-items-center">
              <img className="w-12 h-12" alt="voucher" src={voucher.src} />
              <div className="text-misty">Ваучер</div>
            </div>
            {isShow ? (
              <MdExpandLess className="text-misty text-2xl" />
            ) : (
              <MdExpandMore className="text-misty text-2xl" />
            )}
          </div>
          {isShow && (
            <>
              {returning || paying ? (
                <></>
              ) : (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2  md:grid-cols-1  ">
                  {products &&
                    products?.map((val, index) => (
                      <VoucherCard
                        isBasket={false}
                        loading={paying}
                        key={index}
                        customerProduct={val}
                        selectedId={paymentCode}
                        onChangeState={onChangeState}
                      />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
