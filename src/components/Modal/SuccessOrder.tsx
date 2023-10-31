import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { useTranslation } from 'react-i18next';
import { customThemeWaiterModal } from '../../../styles/themes';
import { useRouter } from 'next/router';
import { useCallStore } from '../../contexts/call.store';
import { emptyOrder } from '../../mock';

import { AiFillCheckCircle } from 'react-icons/ai';
import { SmartBanner } from '..';
import { BannerType } from '../../types';

type Props = {
  visible: boolean;
  orderNumber: any;
};

const Index = ({ visible, orderNumber }: Props) => {
  const { t } = useTranslation('language');
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);

  const { participant, load } = useCallStore();

  const goBack = () => {
    load(emptyOrder);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      router.push(`/restaurant?id=${participant.id}`);
    }, 3000);
  };

  return (
    <Modal show={visible} theme={customThemeWaiterModal}>
      <Modal.Body className="p-1">
        <div className=" max-w-[400px] m-auto">
          <div className="flex place-content-center">
            <div className=" h-24 w-24">
              <AiFillCheckCircle className="text-success text-2xl h-full w-full " />
            </div>
          </div>
          <div className="text-sm mt-2 text-misty text-center font-semibold ">{t('mainPage.YourOrderSuccess')} </div>

          {orderNumber && (
            <div className="text-sm flex gap-2 place-content-center mt-2 text-misty text-center font-semibold ">
              <p>{t('mainPage.YourOrderNumber')}:</p>
              <p className="text-current">{orderNumber.slice(-4)} </p>
            </div>
          )}

          <SmartBanner types={[BannerType.A]} />
        </div>
      </Modal.Body>

      <Modal.Footer className="place-content-center">
        <div className="grid gap-2 place-items-center w-full">
          <Button
            disabled={disabled}
            onClick={() => goBack()}
            className="w-8/12 flex place-content-center justify-center bg-current p-1 rounded-lg cursor-pointer"
          >
            <span className="block  text-sm text-white   font-semibold ">{t('mainPage.GoBack')}</span>
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default Index;
