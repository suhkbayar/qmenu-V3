import { useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FourDigits } from '..';
import { VERIFY_SESSION } from '../../graphql/mutation/register';

type Props = {
  tryCode: () => void;
  goBack: () => void;
  phone: string;
  start: boolean;
  setFormStep: (formStep: number) => void;
  onError: (text: string) => void;
  sessionId: string;
};

const Index = ({ goBack, phone, tryCode, start, setFormStep, onError, sessionId }: Props) => {
  const { t } = useTranslation('language');
  const [time, setTime] = useState(60000);
  const [pin, setPin] = useState<string>();

  const [verifySession, { loading }] = useMutation(VERIFY_SESSION, {
    onCompleted: (data) => {
      if (data.verifySession) {
        setFormStep(2);
      } else {
        onError(t('mainPage.AuthFailed'));
      }
    },
    onError(err) {
      onError(err.message);
    },
  });

  const onTryCode = () => {
    tryCode();
    setTime(60000);
    start = true;
  };

  useEffect(() => {
    let interval: any = null;

    if (start) {
      if (time < 1) {
        start = false;
      } else {
        interval = setInterval(() => {
          setTime((preTime) => preTime - 10);
        }, 10);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [start, time]);

  useEffect(() => {
    if (pin && sessionId) {
      verifySession({ variables: { id: sessionId, pin: pin } });
    }
  }, [pin]);

  return (
    <>
      <div className=" w-full grid  place-items-center  py-5 px-8">
        <div className="text-sm w-full pt-4 pb-2  text-gray1 dark:text-white text-start">
          <span> {t('mainPage.EnterVerificationCodePhone')}</span>
        </div>
        <div className="text-sm w-full pt-4 pb-2  text-gray-800 dark:text-white text-start">
          <span> +(976) {phone}</span>
        </div>
        <div className="w-full ">
          <FourDigits setPin={setPin} />
        </div>
        <div className="text-sm w-full pt-4 pb-2  text-gray1 dark:text-white text-start">
          <span>
            {t('mainPage.CodeNotReceived')}{' '}
            <button
              disabled={time === 0 ? false : true}
              className={`${time === 0 ? 'text-black' : 'text-gray1'} cursor-pointer`}
              onClick={() => onTryCode()}
            >
              {t('mainPage.GETITAGAIN')}
              {time !== 0 && <span className="text-gray1">({('' + Math.floor((time / 1000) % 60)).slice(-2)})</span>}
            </button>
          </span>
        </div>
        <div className="pt-2 pb-2  w-full ">
          <div className="w-full pt-4">
            <button
              onClick={() => goBack()}
              className="w-full rounded-lg  px-4 py-2  md: px-5 py-3    bg-white border border-current text-current hover:bg-white duration-300"
            >
              {t('mainPage.GoBack')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
