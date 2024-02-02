import React from 'react';
import styled from 'styled-components';

interface ResultSectionProps {
  marca: string;
  modeloNome: string;
  ano: string;
  precoTabelaFipe: number | null;
}

// Componentes estilizados
const StyledResultSection = styled.div`
  background-color: #dcf5f2;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
`;

const StyledTitle = styled.h2`
font-size: 32px;
  color: #353535;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px){
    font-size: 18px;
  }
`;

const StyledPrice = styled.p`
  font-size: 24px;
 background-color: #00a38c;
 border-radius: 100px;
 padding: 8px 24px;
 color: white;
 text-align: center;
 width: fit-content;
 font-weight: 700;

 @media (max-width: 768px){
    font-size: 18px;
  }
`;

const StyledSmall = styled.small`
  color: #666;
  font-size: 12px;
  text-align: center;
`;

const ResultSection: React.FC<ResultSectionProps> = ({ marca, modeloNome, ano, precoTabelaFipe }) => {
  return (
    <StyledResultSection>
      <StyledTitle>
        Tabela Fipe: Preço {marca} {modeloNome} {ano.split('-')[0]}
      </StyledTitle>
      <StyledPrice>{precoTabelaFipe}</StyledPrice>
      <StyledSmall>Esse é o preço de compra do veículo</StyledSmall>
    </StyledResultSection>
  );
};

export default ResultSection;
