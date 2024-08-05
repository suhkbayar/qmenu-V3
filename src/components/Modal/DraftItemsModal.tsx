import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CURRENCY } from '../../constants/currency';
import { useCallStore } from '../../contexts/call.store';
import { Modal } from 'flowbite-react';
import { customThemeDraftModal } from '../../../styles/themes';
import { AdultsOnlyModal, DraftItemCard, SuccesOrderModal } from '..';
import { isEmpty } from 'lodash';
import { NotificationType, TYPE } from '../../constants/constant';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER, GET_PAY_ORDER } from '../../graphql/mutation/order';
import { GET_ORDERS } from '../../graphql/query';
import { IOrder } from '../../types';
import { useRouter } from 'next/router';
import { CgSpinner } from 'react-icons/cg';
import { useNotificationContext } from '../../providers/notification';
import { emptyOrder } from '../../mock';

type Props = {
  visible: any;
  onClose: () => void;
};

const Index = ({ visible, onClose }: Props) => {
  const { t } = useTranslation('language');
  const router = useRouter();

  const [visibleSucces, setVisibleSucces] = useState(false);

  const { order, participant, config, load } = useCallStore();
  const { showNotification } = useNotificationContext();
  const [isAdultsOnly, setIsAdultOnly] = useState(false);

  const products = participant.menu.categories.flatMap((category) => {
    return [...category.products, ...category.children.flatMap((child) => child.products)];
  });

  const [payCashier, { data, loading: cashierPaying }] = useMutation(GET_PAY_ORDER, {
    onCompleted: (data) => {
      setVisibleSucces(true);
    },
    onError(err) {
      showNotification(NotificationType.ERROR, err.message);
    },
  });

  const onCashier = async (order: IOrder) => {
    let input = {
      confirm: true,
      order: order.id,
      payment: '',
      vatType: '1',
    };

    await payCashier({
      variables: {
        input: { ...input },
      },
    });
  };

  const isDiningService = participant.services.includes(TYPE.DINIG) && participant.services.length === 1;

  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    update(cache, { data: { createOrder } }) {
      const caches = cache.readQuery<{ getOrders: IOrder[] }>({ query: GET_ORDERS });
      if (caches && caches.getOrders) {
        cache.writeQuery({
          query: GET_ORDERS,
          data: { getOrders: caches.getOrders.concat([createOrder]) },
        });
      }
    },
    onCompleted: async (data) => {
      if (config.noCheckout) {
        await onCashier(data.createOrder);
      } else {
        router.push(`/payment?id=${data.createOrder.id}`);
      }
    },
    onError(err) {},
  });

  const onComfirmAdultsOnly = () => {
    setIsAdultOnly(false);
    if (isEmpty(order.items)) return;
    if (isDiningService) {
      let items = order.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        comment: item.comment,
        options: item.options.map((option) => ({
          id: option.id,
          value: option.value,
        })),
      }));

      createOrder({
        variables: {
          participant: participant.id,
          input: {
            type: TYPE.DINIG,
            deliveryDate: '',
            contact: '',
            address: '',
            name: '',
            comment: '',
            guests: 1,
            items: items,
          },
        },
      });
    } else {
      router.push(`/payment/order-process`);
    }
  };

  const successOnClose = () => {
    load(emptyOrder);
    setVisibleSucces(false);
    onClose();
  };

  const Continue = () => {
    if (
      order.items.some((item) => products.some((product) => product.productId === item.productId && product.adultsOnly))
    ) {
      setIsAdultOnly(true);
    } else {
      if (isDiningService) {
        let items = order.items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          comment: item.comment,
          options: item.options.map((option) => ({
            id: option.id,
            value: option.value,
          })),
        }));

        createOrder({
          variables: {
            participant: participant.id,
            input: {
              type: TYPE.DINIG,
              deliveryDate: '',
              contact: '',
              address: '',
              name: '',
              comment: '',
              guests: 1,
              items: items,
            },
          },
        });
      } else {
        router.push(`/payment/order-process`);
      }
    }
  };

  return (
    <>
      <Modal
        theme={customThemeDraftModal}
        style={{
          background: config.backgroundColor,
        }}
        position="center"
        dismissible
        show={visible}
        onClose={() => onClose()}
      >
        <Modal.Header
          style={{
            color: config?.textColor,
            background: config.backgroundColor,
          }}
        >
          <span
            className="text-lg"
            style={{
              color: config?.textColor,
            }}
          >
            {t('mainPage.MyOrder')}
          </span>
        </Modal.Header>
        <Modal.Body
          className="p-4"
          style={{
            background: config.backgroundColor,
            color: config?.textColor,
          }}
        >
          {order?.items?.map((item) => (
            <DraftItemCard
              item={item}
              key={item.id}
              image={products.find((product) => product.productId === item.productId)?.image}
            />
          ))}
        </Modal.Body>
        <Modal.Footer
          style={{
            background: config.backgroundColor,
          }}
        >
          <button
            style={{
              background: config.backgroundColor,
              border: `1px solid ${config?.textColor}`,
            }}
            disabled={loading || cashierPaying}
            className={`w-full flex  justify-between  p-3 rounded-lg  ${
              isEmpty(order.items) ? 'bg-misty cursor-none ' : 'bg-current  cursor-pointer'
            } `}
            onClick={() => Continue()}
          >
            <div className="flex place-items-center">
              {(loading || cashierPaying) && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
              <span
                style={{
                  color: config?.textColor,
                }}
                className="block   text-white font-semibold "
              >
                {config.noCheckout ? 'Баталгаажуулах' : t('mainPage.ToBeContinued')}
              </span>
            </div>

            <span
              className="block text-white font-semibold "
              style={{
                color: config?.textColor,
              }}
            >
              {order.totalAmount.toLocaleString()} {CURRENCY}
            </span>
          </button>
        </Modal.Footer>
      </Modal>
      {isAdultsOnly && (
        <AdultsOnlyModal
          loading={loading}
          visible={isAdultsOnly}
          onClose={() => setIsAdultOnly(false)}
          onConfirm={onComfirmAdultsOnly}
        />
      )}
      {visibleSucces && (
        <SuccesOrderModal visible={visibleSucces} orderNumber={data.payOrder?.order?.number} onClose={successOnClose} />
      )}
    </>
  );
};

export default Index;
