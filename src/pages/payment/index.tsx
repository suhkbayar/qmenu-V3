import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useCallStore } from '../../contexts/call.store';
import { GET_ORDER } from '../../graphql/query';
import {
  UpointForm,
  BankFrom,
  InfoAlert,
  PayCashierModal,
  PaymentBotton,
  PaymentHeader,
  QpayForm,
  SuccesOrderModal,
  VatForm,
  WaitPaymentModal,
  VoucherForm,
} from '../../components';
import Loader from '../../components/Loader/Loader';
import { useForm } from 'react-hook-form';

import { NotificationType, PAYMENT_TYPE, LoyaltyType } from '../../constants/constant';
import {
  GET_PAY_ORDER,
  VALIDATE_TRANSACTION,
  PAY_ORDER_WITH_SUB_PAYMENTS,
  CORRECTION_TRANSACTION,
} from '../../graphql/mutation/order';
import { ITransaction } from '../../types/transaction';
import { useNotificationContext } from '../../providers/notification';
import { useLoyaltyContext } from '../../contexts/loyalty.context';

const filterBanks = ['QPay', 'UPT', 'Upoint', 'VCR'];

const Index = () => {
  const router = useRouter();
  const { id } = router.query;
  const [visiblePending, setVisiblePending] = useState(false);
  const [visibleSucces, setVisibleSucces] = useState(false);
  const [visibleCashier, setVisibleCashier] = useState(false);
  const { participant, user } = useCallStore();
  const { showNotification, showCustomNotification } = useNotificationContext();
  const [transaction, setTransaction] = useState<ITransaction>();
  const [cancelTransactionId, setCancelTransactionId] = useState<string>(null);
  const { upointBalance, addOrderLoyalty, addingLoyalty, clearUpointState } = useLoyaltyContext();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  register('paymentId', { required: true });
  register('paymentType', { required: true });

  const paymentType = watch('paymentType');
  const buyer = watch('buyer');
  const vatType = watch('vatType');
  const companyRegister = watch('register');

  const { loading, data, refetch } = useQuery(GET_ORDER, {
    skip: !id,
    variables: { id: id },
    onError(err) {
      showNotification(NotificationType.WARNING, err.message);

      if (participant) {
        router.push(`/restaurant?id=${participant.id}`);
      }
    },

    onCompleted: (data) => {
      if (data?.getOrder.paymentState === 'PAID') {
        setVisiblePending(false);
        setVisibleCashier(false);
        setVisibleSucces(true);
      }
    },
  });

  const [returnTransaction, { loading: returning }] = useMutation(CORRECTION_TRANSACTION);

  const [payCashier, { loading: cashierPaying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      setVisibleCashier(false);
      setVisibleSucces(true);
    },
    onError(err) {
      showNotification(NotificationType.ERROR, err.message);
    },
  });

  const [validateTransaction, { loading: validating }] = useMutation(VALIDATE_TRANSACTION, {
    onCompleted(data) {
      if (data.validateTransaction.paymentState === 'PAID') {
        setVisibleCashier(false);
        setVisiblePending(false);
        setVisibleSucces(true);
      } else if (data.validateTransaction.paymentState !== 'PAID') {
        showCustomNotification('Төлөгдөөгүй', 'Таны төлбөр төлөгдөөгүй байна.');
      }
    },
  });

  const [payOrderByPayment, { loading: paying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: async (data) => {
      if (data.payOrder.order.paymentState === 'PAID') {
        setVisibleCashier(false);
        setVisiblePending(false);
        setVisibleSucces(true);
      } else {
        setTransaction(data.payOrder.transaction);
        let link = null;
        if (data.payOrder.transaction.links) {
          link = data.payOrder.transaction.links.find(
            (link) => link.name.toUpperCase() === paymentType.toUpperCase(),
          )?.link;
        }

        if (link) {
          window.location.href = link;
          setVisiblePending(true);
        } else {
          showNotification(NotificationType.ERROR, 'Payment link not found'); // Handle the case when the link is not found
        }
      }
    },
    onError(err) {
      showNotification(NotificationType.ERROR, err.message);
    },
  });

  const onCompletedPayOrder = (data: any) => {
    if (upointBalance?.state === 'spend')
      setCancelTransactionId(
        data.order.transactions?.find((item: ITransaction) => item.state === 'PAID' && item.type === PAYMENT_TYPE.UPT)
          ?.id,
      );

    setTransaction(data.transaction);
    let link = data.transaction.links.find((link) => link.name.toUpperCase() === paymentType.toUpperCase())?.link;
    if (link) {
      window.location.href = link;
      setVisiblePending(true);
    } else {
      showNotification(NotificationType.ERROR, 'Payment link not found'); // Handle the case when the link is not found
    }
  };

  const [payOrderByPayments, { loading: paying2 }] = useMutation(PAY_ORDER_WITH_SUB_PAYMENTS, {
    onCompleted: (data) => {
      onCompletedPayOrder(data.payOrderWithSubPayments);
    },
    onError(err) {},
  });

  const onCashier = () => {
    if (cashierPaying) return;

    let input = {
      buyer: buyer,
      confirm: true,
      order: id,
      payment: '',
      register: companyRegister,
      vatType: vatType,
    };

    payCashier({
      variables: {
        input: { ...input },
      },
    });
  };

  const showCashier = () => {
    setVisibleCashier(true);
  };

  const goBack = () => {
    router.push(`/restaurant?id=${participant.id}`);
  };

  const updateOrder = (data) => {
    refetch();
  };

  const finish = () => {
    setVisibleCashier(false);
    setVisiblePending(false);
    setVisibleSucces(true);
  };

  useEffect(() => {
    clearUpointState();
    if (data?.getOrder?.transaction?.length > 0) {
      setTransaction(data.getOrder.transaction[0]);
    }
  }, []);

  if (!data) {
    return <Loader />;
  }

  const onSubmit = async (values: any) => {
    if (paying || paying2) return;
    let inputs = [
      {
        buyer: values.buyer,
        confirm: false,
        order: id,
        payment: values.paymentId,
        register: values.register,
        vatType: values.vatType,
        code: values.paymentCode,
      },
    ];

    if (upointBalance?.state === 'spend') {
      inputs = inputs.concat([
        {
          order: data?.getOrder?.id,
          buyer: '',
          register: '',
          vatType: 1,
          payment: participant?.payments.find((val: any) => val.type === PAYMENT_TYPE.UPT)?.id,
          confirm: false,
          code: '',
        },
      ]);
    }

    if (upointBalance && upointBalance.state === 'collect') {
      await addOrderLoyalty({
        variables: { id: data?.getOrder?.id, type: LoyaltyType.U },
        onError: (error: Error) => showNotification(NotificationType.ERROR, error.message),
      });
    }

    if (inputs.length > 1) {
      payOrderByPayments({ variables: { input: inputs[0], inputs: inputs[1] } });
    } else {
      payOrderByPayment({
        variables: {
          input: { ...inputs[0] },
        },
      });
    }
  };

  const onSelectBank = (type: any, id: string) => {
    setValue('paymentId', id);
    setValue('paymentType', type);
  };

  const onRefetch = async (transactionId: string) => {
    try {
      await validateTransaction({
        variables: { id: transactionId },
        onCompleted(data) {
          if (data.validateTransaction.paymentState === 'PAID') {
            setVisibleCashier(false);
            setVisiblePending(false);
            setVisibleSucces(true);
            clearUpointState();
          } else if (data.validateTransaction.paymentState !== 'PAID') {
            showCustomNotification('Төлөгдөөгүй', 'Таны төлбөр төлөгдөөгүй байна.');
          }
        },
      });
    } catch (error) {
      console.error('Error while refetching:', error);
      showNotification(NotificationType.ERROR, 'Та мэдээллийг дахин татахад алдаа гарлаа.');
    }
  };

  const onCloseWaitPaymentModal = async (transactionId: string) => {
    if (cancelTransactionId) {
      const { data } = await validateTransaction({
        variables: { id: transactionId },
      });
      if (data.validateTransaction.paymentState !== 'PAID') {
        await returnTransaction({
          variables: {
            id: cancelTransactionId,
            reason: 'Цуцалсан',
          },
        });
        clearUpointState();
      }
    }
    setVisiblePending(false);
  };

  return (
    <>
      <div className="h-screen flex place-items-center">
        <PaymentHeader goBack={goBack} order={data.getOrder} />
        <div className="overflow-auto login-body w-full py-20">
          <div className="w-full  flex place-content-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full sm:w-full md:w-6/12 lg:w-6/12 xl:w-4/12 2xl:w-4/12 "
            >
              <div className="pl-4 pr-4 pt-2 pb-4">
                <InfoAlert text={'Та төлбөрөө төлөөд энэхүү дэлгэцрүү буцан орж захиалгаа баталгаажуулаарай.'} />
              </div>
              <div className="px-4 mb-5 gap-y-4">
                {participant.vat && <VatForm register={register} errors={errors} setValue={setValue} reset={reset} />}

                <BankFrom
                  banks={participant.payments.filter((payment) => !filterBanks.includes(payment.type))}
                  watch={watch}
                  onSelect={onSelectBank}
                />

                <QpayForm
                  id={participant.payments.find((payment) => payment.type === PAYMENT_TYPE.QPay)?.id}
                  watch={watch}
                  onSelect={onSelectBank}
                />

                {participant.payments.find((payment) => payment.type === PAYMENT_TYPE.VCR) && (
                  <VoucherForm
                    order={data?.getOrder?.id}
                    id={participant.payments.find((payment) => payment.type === PAYMENT_TYPE.VCR)?.id}
                    watch={watch}
                    onUpdateOrder={(data) => updateOrder(data)}
                    onFinish={finish}
                  />
                )}

                <UpointForm
                  order={data.getOrder}
                  user={user}
                  payment={participant.payments.find((item) => item.type === PAYMENT_TYPE.UPT)}
                />
              </div>

              <PaymentBotton
                showCashier={showCashier}
                paymentType={paymentType}
                loading={loading || paying || cashierPaying || addingLoyalty || paying2 || validating}
                grandTotal={data.getOrder.debtAmount}
              />
            </form>
          </div>
        </div>
      </div>
      {visiblePending && (
        <WaitPaymentModal
          loadingCancel={returning}
          transaction={transaction}
          visible={visiblePending}
          onClose={onCloseWaitPaymentModal}
          refetch={onRefetch}
        />
      )}
      {visibleCashier && (
        <PayCashierModal onConfirm={onCashier} visible={visibleCashier} onClose={() => setVisibleCashier(false)} />
      )}

      {visibleSucces && <SuccesOrderModal visible={visibleSucces} orderNumber={data.getOrder.number} />}
    </>
  );
};

export default Index;
