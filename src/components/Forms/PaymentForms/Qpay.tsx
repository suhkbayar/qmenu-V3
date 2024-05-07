import React from 'react';
import { qpyBanks, qpy2Banks } from '../../../mock'; // Import your data source
import { ConvertQpayBankImg } from '../../../tools/convertImg'; // Import your image conversion function
import checkImage from './img/Check.png'; // Import the checkmark image
import { IPayment } from '../../../types';
import { PAYMENT_TYPE } from '../../../constants/constant';

type Props = {
  payment?: IPayment;
  watch: any;
  onSelect: (type: string, id: string) => void;
};

const Index: React.FC<Props> = ({ payment, watch, onSelect }) => {
  const paymentType = watch('paymentType');

  if (!payment?.id) return null;

  return (
    <div className="w-full bg-white rounded-lg p-2 mt-4 dark:bg-gray-700">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {(payment.type === PAYMENT_TYPE.QPay ? qpyBanks : qpy2Banks).map((bank, index) => (
          <div
            key={index}
            onClick={() => onSelect(bank.type, payment.id)}
            className="rounded-lg flex place-self-center relative"
          >
            {paymentType === bank.type && (
              <img className="absolute mt-1.5 ml-1.5 w-4" src={checkImage.src} alt="Checkmark" />
            )}

            <img
              className={`w-16 rounded-lg ${paymentType === bank.type ? 'border-4 border-current' : ''}`}
              src={ConvertQpayBankImg(bank.type)}
              alt={`${bank.type} Bank`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
