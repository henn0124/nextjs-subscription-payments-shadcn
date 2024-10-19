import React, { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onChange?: (...args: unknown[]) => void;
}

const Input = (props: Props) => {
  const { className, onChange, ...rest } = props;

  return (
    <input
      className={className}
      onChange={onChange && ((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value))}
      {...rest}
    />
  );
};

export default Input;
