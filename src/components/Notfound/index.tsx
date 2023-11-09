import React from 'react';
import error from '../../assets/images/unHappy.svg';

type Props = {
  text: string;
  title: string;
};

const Index = ({ text, title }: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 grid text-center place-items-center">
      <img src={error.src} alt="Error" />
      <div className="grid text-center place-items-center mt-4">
        <span className="text-lg text-current font-medium ">{title}</span>
        <span className="text-sm text-misty ">{text}</span>
      </div>
    </div>
  );
};

export default Index;
