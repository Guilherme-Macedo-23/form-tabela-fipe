import React from 'react';
import styled from 'styled-components';

const StyledTitleSection = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const StyledTitle = styled.h2`
  font-size: 32px;
  color: #353535;
  font-weight: 700;

  @media (max-width: 768px){
    font-size: 18px;
  }
`;

const StyledSubtitle = styled.h5`
  font-size: 24px;
  color: #353535;
  margin-bottom: 5px;
  font-weight: 700;

  @media (max-width: 768px){
    font-size: 14px;
  }
`;

const TitleSection: React.FC = () => {
  return (
    <StyledTitleSection>
      <StyledTitle>Tabela Fipe</StyledTitle>
      <StyledSubtitle>Consulte o valor de um veículo de forma gratuita</StyledSubtitle>
    </StyledTitleSection>
  );
};

export default TitleSection;
