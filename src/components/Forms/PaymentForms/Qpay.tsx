import React from 'react';
import { qpyBanks } from '../../../mock'; // Import your data source
import { ConvertQpayBankImg } from '../../../tools/convertImg'; // Import your image conversion function
import checkImage from './img/Check.png'; // Import the checkmark image

type Props = {
  id: string;
  watch: any;
  onSelect: (type: string, id: string) => void;
};

const Index: React.FC<Props> = ({ id, watch, onSelect }) => {
  const paymentType = watch('paymentType');

  if (!id) return null;

  return (
    <div className="w-full bg-white rounded-lg p-2 mt-4">
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {qpyBanks.map((bank, index) => (
          <div
            key={index}
            onClick={() => onSelect(bank.type, id)}
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
