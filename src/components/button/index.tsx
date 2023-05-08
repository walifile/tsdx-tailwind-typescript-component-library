import React, { ReactNode } from 'react';
import { Button } from '@geist-ui/core';

export interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
  label: string;
  type?: ButtonType;
}
type ButtonType = 'button' | 'submit' | 'reset';

export const CustomButton = ({
  onClick,
  disabled = false,
  loading = false,
  icon,
  className,
  label,
  type = 'button',
}: ButtonProps) => {
  return (
    <Button
      type="secondary"
      htmlType={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      icon={icon}
      className={`${className} !bg-primary  hover:!bg-white  !border-primary text-white hover:!text-primary`}
    >
      {label}
    </Button>
  );
};
