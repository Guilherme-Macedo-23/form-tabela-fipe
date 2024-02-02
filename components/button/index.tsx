import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Button as MuiButton } from '@mui/material';

interface LoadingSpinnerProps {
  loading: boolean;
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${rotate} 1s linear infinite;
  position: absolute;
  transform: translate(-50%, -50%);
  visibility: ${(props) => (props.loading ? 'visible' : 'hidden')};
`;

const StyledButton = styled(MuiButton)`
  background-color: #5d00bf;
  color: white;
  padding: 8px 24px;
  border-radius: 4px;
  font-weight: bold;
  text-transform: initial;
  height: 40px;
  min-width: 180px;
  max-width: 180px;
  margin: 0 auto;
  position: relative;
`;

interface ButtonSearchProps {
  onClick: () => void;
  children: React.ReactNode;
  loading: boolean;
}

const ButtonSearch: React.FC<ButtonSearchProps> = ({ onClick, children, loading }) => {
  return (
    <StyledButton variant="contained" onClick={onClick} disabled={loading}>
       {loading ? <LoadingSpinner loading={loading} /> : children}
    </StyledButton>
  );
};

export default ButtonSearch;
