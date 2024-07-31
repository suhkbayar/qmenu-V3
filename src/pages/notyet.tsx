import React from 'react';
import { Notfound } from '../components';

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative w-full h-screen">
      <Notfound title="Урьдчилан захиалсан цаг болоогүй байна." text="Ширээ сул байгаа бол та касс-нд хандана уу" />
    </div>
  );
};

export default NotFoundPage;
