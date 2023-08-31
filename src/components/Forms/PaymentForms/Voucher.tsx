import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { VoucherCard } from '../..';
import { GET_CUSTOMER_PRODUCTS } from '../../../graphql/query';
import voucher from '../../../assets/user/voucher.svg';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { PAYMENT_TYPE } from '../../../constants/constant';

type Props = {
  id: string;
  watch: any;
  onSelect: (type: string, code: string) => void;
  onSeletId: (id: string) => void;
};

const Index = ({ id, watch, onSelect, onSeletId }: Props) => {
  const paymentId = watch('paymentId');
  const paymentCode = watch('paymentCode');

  const [isShow, setIsShow] = useState(false);

  const { data } = useQuery(GET_CUSTOMER_PRODUCTS, { fetchPolicy: 'network-only' });

  useEffect(() => {
    if (paymentId !== id) {
      setIsShow(false);
    }
  }, [paymentId]);

  const onExpand = () => {
    setIsShow(!isShow);
    onSeletId(id);
  };

  const onSelectVoucher = (code) => {
    onSelect(PAYMENT_TYPE.VCR, code);
  };

  if (!id) return null;

  return (
    <>
      {data && (
        <div
          className={`w-full bg-white rounded-lg p-2 mt-4  border ${
            paymentId && paymentId === id ? 'border-current' : ' border-white'
          } `}
        >
          <div className="flex place-items-center place-content-between p-1" onClick={() => onExpand()}>
            <div className="flex gap-2 place-items-center">
              <img className="w-12 h-12" src={voucher.src} />
              <div className="text-misty">Воучер</div>
            </div>
            {isShow ? (
              <MdExpandLess className="text-misty text-2xl" />
            ) : (
              <MdExpandMore className="text-misty text-2xl" />
            )}
          </div>
          {isShow && (
            <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 mt-2 md:grid-cols-2 place-items-center  place-content-center">
              {data?.getCustomerProducts
                .filter((customerProduct) => customerProduct.state === 'ACTIVE')
                ?.map((val, index) => (
                  <VoucherCard
                    key={index}
                    product={val.product}
                    onSelect={(code) => onSelectVoucher(code)}
                    id={val.id}
                    expiredAt={val.expiredAt}
                    selectedId={paymentCode}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Index;
