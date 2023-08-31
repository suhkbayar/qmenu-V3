import { Modal } from 'flowbite-react';
import React from 'react';
import { customThemeWaiterModal } from '../../../styles/themes';

type Props = {
  visible: boolean;
  onClose: () => void;
  image: any;
  name: string;
  description: string;
  amount: number;
  configs: any[];
  price: number;
};

const Index = ({ visible, onClose, image, name, description, amount, price, configs }: Props) => {
  const activeRank = configs.find((config) => {
    const { value } = JSON.parse(config.value);
    if (Number(amount) < Number(value)) {
      return true;
    }
  });

  return (
    <>
      <Modal show={visible} theme={customThemeWaiterModal} onClose={() => onClose()}>
        <Modal.Body className="p-1">
          <div className="grid place-content-center gap-2">
            <span>{name}</span>
            <img src={image} className="w-24 h-full" />
          </div>
          <div className="text-sm mt-2 text-misty text-center font-semibold ">{description}</div>
          {activeRank && (
            <div className="text-sm mt-2 text-misty text-center font-semibold ">
              Та одоо {activeRank.name} - д хүрсэн байна
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="place-content-center">
          <div className="grid gap-2 place-items-center w-full">
            <div
              onClick={() => onClose()}
              className="w-8/12 flex place-content-center justify-center bg-white border border-current p-3 rounded-lg cursor-pointer"
            >
              <span className="block  text-sm text-current   font-semibold ">Хаах</span>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Index;
