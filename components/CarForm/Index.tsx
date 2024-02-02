import React, { useState, useEffect } from 'react';
import InputSelect from '../input/index';
import ButtonSearch from '../button/index';
import ResultSection from '../ResultSection/index';
import { getNomeMarca } from '../../utils/nomeMarca';
import { useCarContext } from '../../context/CarContext';
import styled from 'styled-components';

const CarForm: React.FC = () => {
  const { marcas, modelos, anos, fetchModelos, fetchAnos, fetchPreco } = useCarContext();
  const [selectedMarca, setSelectedMarca] = useState<string>('');
  const [selectedModelo, setSelectedModelo] = useState<string>('');
  const [selectedAno, setSelectedAno] = useState<string>('');
  const [precoTabelaFipe, setPrecoTabelaFipe] = useState<number | null>(null);
  const [buscaRealizada, setBuscaRealizada] = useState(false);
  const [marcaError, setMarcaError] = useState(false);
  const [modeloError, setModeloError] = useState(false);
  const [anoError, setAnoError] = useState(false);
  const [selectedModeloNome, setSelectedModeloNome] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const StyledCarFormCOntainer = styled.div`
    width: 100%;
  `;

  const StyledCarForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    padding: 24px 32px;
    max-width: 500px;

    @media (max-width: 768px){
      width: 90%;
    }
  `;

  const ErrorMessage = styled.div`
color: red;
font-size: 14px;
margin-top: 8px;
`;

  const handleBuscarPreco = async () => {
    if (!selectedMarca) {
      setMarcaError(true);
      return;
    }
    if (!selectedModelo) {
      setModeloError(true);
      return;
    }
    if (!selectedAno) {
      setAnoError(true);
      return;
    }

    try {
      setLoading(true);
      const preco = await fetchPreco(selectedMarca, selectedModelo, selectedAno);
      setPrecoTabelaFipe(preco);
      setBuscaRealizada(true);
    } catch (error) {
      console.error('Erro ao buscar preço na Tabela Fipe:', error);
      setError('Não foi possível obter os dados do veículo. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setBuscaRealizada(false);
  }, [selectedMarca, selectedModelo, selectedAno]);

  useEffect(() => {
    const modeloSelecionado = modelos.find(modelo => modelo.codigo === selectedModelo);
    if (modeloSelecionado) {
      setSelectedModeloNome(modeloSelecionado.nome);
    }
  }, [selectedModelo, modelos]);

  return (
    <StyledCarFormCOntainer>
      <StyledCarForm>
        <InputSelect
          options={marcas.map(marca => ({ value: marca.codigo, label: marca.nome }))}
          value={selectedMarca}
          onChange={(e) => {
            setSelectedMarca(e.target.value as string);
            setMarcaError(false);
            setSelectedModelo('');
            setSelectedAno('');
            fetchModelos(e.target.value as string);
          }}
          label="Marca"
          error={marcaError}
        />

        <InputSelect
          options={modelos.map(modelo => ({ value: modelo.codigo, label: modelo.nome }))}
          value={selectedModelo}
          onChange={(e) => {
            setSelectedModelo(e.target.value as string);
            setModeloError(false);
            setSelectedAno('');
            fetchAnos(selectedMarca, e.target.value as string);
          }}
          label="Modelo"
          error={modeloError}
        />

        <InputSelect
          options={anos.map(ano => ({ value: ano.codigo, label: ano.nome.split(' ')[0]}))}
          value={selectedAno}
          onChange={(e) => {
            setSelectedAno(e.target.value as string);
            setAnoError(false);
          }}
          label="Ano"
          error={anoError}
          hidden={!selectedMarca || !selectedModelo}
        />

        <ButtonSearch
          onClick={handleBuscarPreco}
          loading={loading}
        >
          Consultar Preço
        </ButtonSearch>
      </StyledCarForm>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!error && buscaRealizada && (
        <ResultSection
          marca={selectedMarca && getNomeMarca(selectedMarca, marcas)}
          modeloNome={selectedModeloNome}
          ano={selectedAno}
          precoTabelaFipe={precoTabelaFipe}
        />
      )}
    </StyledCarFormCOntainer>
  );
};

export default CarForm;
