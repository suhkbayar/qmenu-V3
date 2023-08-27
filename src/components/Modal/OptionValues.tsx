import React from 'react';
import { TfiClose } from 'react-icons/tfi';
type Props = {
  visible: boolean;
  onClose: () => void;
  values: any[];
  onSelectValue: (value: any) => void;
};

const Index = ({ visible, onClose, values, onSelectValue }: Props) => {
  return (
    <>
      <div className={`fixed z-10 inset-0 flex items-center justify-center ${visible ? '' : 'hidden'}`}>
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <div className="inline-block  w-64 align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex p-4 pb-1 place-content-between">
            <span>Сонголт</span>
            <TfiClose onClick={onClose} className="  w-5 h-5" />
          </div>
          <div className="border-b my-2"></div>

          <div className="bg-white  p-4 pt-0 ">
            {values.map((item) => (
              <div
                key={item}
                onClick={() => onSelectValue(item)}
                className="w-full hover:bg-gainsboro   p-2 text-misty"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
