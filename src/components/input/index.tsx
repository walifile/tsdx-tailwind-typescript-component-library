import React from 'react';
import { Input, Text } from '@geist-ui/core';
import { CustomInputStyled } from '../../styles/InputStyles';

export interface InputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  icon?: React.ReactElement;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

export const CustomInput: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  icon,
  setValue,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(event.target.value);
    }
  };

  return (
    <CustomInputStyled>
      <Input
        value={value || ''}
        placeholder={placeholder}
        width="100%"
        iconRight={icon && icon}
        onChange={handleInputChange}
      >
        <Text p b>
          {label}
        </Text>
      </Input>
    </CustomInputStyled>
  );
};
