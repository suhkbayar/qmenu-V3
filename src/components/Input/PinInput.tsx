import React, { useEffect, useRef, useState } from 'react';

type Props = {
  onChange?: (e: any) => void;
  onSubmit?: (e: any) => void;
  className?: string;
  length?: number;
  loading?: boolean;
};

let blurable = true;

const PinInput = ({ onChange, onSubmit, className = '', length = 4, loading }: Props) => {
  const [pinCode, setPinCode] = useState<any>(new Array(length).fill(''));
  const inputRefs: any = useRef(new Array(length).fill(null));

  const focusInput = (index: number) => {
    if (!loading) inputRefs?.current?.[index]?.focus();
    blurable = true;
  };

  const handleInputChange = (propValue: string = '') => {
    const newPin = pinCode.join('') + propValue;

    onChange?.(newPin);
    setPinCode(new Array(length).fill('').map((e, i) => (newPin[i] ? newPin[i] : e)));

    if (newPin.length === 0) {
      focusInput(0);
    } else if (newPin.length < length) {
      focusInput(newPin.length);
    } else if (newPin.length === length) {
      onSubmit?.(newPin);
      setPinCode(new Array(length).fill(''));
      focusInput(0);
    }
  };

  const handleKeyDown = (index, event) => {
    blurable = false;
    if (event.key === 'Backspace') {
      if (index > 0) {
        const newPin = pinCode;
        newPin[index - 1] = '';
        setPinCode(newPin);
        focusInput(index - 1);
      }
    }
  };

  useEffect(() => focusInput(0), [loading]);

  return (
    <div className={className + ' flex items-center justify-center ' + (loading ? 'opacity-50 ' : '')}>
      {pinCode.map((_: any, index: any) => (
        <input
          key={index}
          className="rounded-lg w-12 h-12 border-gray-200 text-center text-xl focus:border-current focus:ring-0"
          autoComplete="new-password"
          placeholder="*"
          type="password"
          value={pinCode[index] || ''}
          inputMode="numeric"
          autoFocus={index === 0}
          ref={(el) => (inputRefs.current[index] = el)}
          onBlur={() => blurable && focusInput(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onChange={(event) => !loading && handleInputChange(event.target.value)}
          disabled={loading}
        />
      ))}
    </div>
  );
};

export default PinInput;
