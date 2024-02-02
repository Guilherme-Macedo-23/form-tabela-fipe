import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import styled from 'styled-components';

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps {
  options: Option[];
  value: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  label: string;
  error: boolean;
  hidden?: boolean;
}

const StyledFormControl = styled(FormControl)`
  width: 100%;
  display: flex;
  margin-bottom: 16px;
`;

const StyledInputLabel = styled(InputLabel)`
  font-size: 16px;
`;

const StyledSelect = styled(Select)`
  font-size: 16px;
`;

const StyledMenuItem = styled(MenuItem)`
  font-size: 16px;
`;

const InputSelect: React.FC<InputSelectProps> = ({ options, value, onChange, label, error, hidden }) => {
  if (hidden) {
    return null;
  }

  return (
    <StyledFormControl error={error}>
      <StyledInputLabel id={`${label.toLowerCase()}-label`}>{label}</StyledInputLabel>
      <StyledSelect
        labelId={`${label.toLowerCase()}-label`}
        id={label.toLowerCase()}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <StyledMenuItem key={option.value} value={option.value}>
            {option.label}
          </StyledMenuItem>
        ))}
      </StyledSelect>
      {error && <FormHelperText>Campo obrigatório</FormHelperText>}
    </StyledFormControl>
  );
};

export default InputSelect;
