import React, { useMemo } from 'react';
import { Button, Notfound } from '../../components';
import { usePreOrderStore } from '../../contexts/preorder.store';
import { useRouter } from 'next/router';

const NotFoundPage: React.FC = () => {
  const { orders } = usePreOrderStore();
  const router = useRouter();

  const { numbers, qr } = useMemo(() => {
    const qr = typeof window !== 'undefined' ? window.localStorage.getItem('qr') : undefined;
    if (orders.length > 0) {
      if (orders.length === 1) return { numbers: orders[0].number, qr };
      else return { numbers: orders.map((e) => e.number).join(', '), qr };
    }

    return { numbers: '', qr };
  }, [orders]);

  return (
    <div className="relative w-full h-screen">
      <Notfound
        title="Урьдчилан захиалсан цаг болоогүй байна."
        text={`Ширээ сул байгаа бол та касс-нд хандана уу. Таны захиалгын дугаар ${numbers}`}
      />
      {qr && (
        <Button
          className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 h-10 w-max"
          onClick={() => router.replace('/qr/' + qr)}
          // text={t('mainPage.Signout')}
          text="Дахин оролдох"
        />
      )}
    </div>
  );
};

export default NotFoundPage;
