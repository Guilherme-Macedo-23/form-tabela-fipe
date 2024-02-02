import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { Marca, Modelo, Ano } from '../interfaces/CarroInterfaces';

interface CarContextType {
  marcas: Marca[];
  setMarcas: React.Dispatch<React.SetStateAction<Marca[]>>;
  modelos: Modelo[];
  setModelos: React.Dispatch<React.SetStateAction<Modelo[]>>;
  anos: Ano[];
  setAnos: React.Dispatch<React.SetStateAction<Ano[]>>;
  fetchModelos: (marcaCodigo: string) => void;
  fetchAnos: (marcaCodigo: string, modeloCodigo: string) => void;
  fetchPreco: (marcaCodigo: string, modeloCodigo: string, anoCodigo: string) => Promise<number>;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [anos, setAnos] = useState<Ano[]>([]);

  useEffect(() => {
    const fetchMarcas = async () => {
      try {
        const response = await axios.get<Marca[]>('https://parallelum.com.br/fipe/api/v1/carros/marcas');
        setMarcas(response.data);
      } catch (error) {
        console.error('Erro ao buscar marcas:', error);
      }
    };

    fetchMarcas();
  }, []);

  const fetchModelos = async (marcaCodigo: string) => {
    try {
      const response = await axios.get<{ modelos: Modelo[] }>(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos`);
      setModelos(response.data.modelos || []);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
    }
  };

  const fetchAnos = async (marcaCodigo: string, modeloCodigo: string) => {
    try {
      const response = await axios.get<Ano[]>(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos`);
      setAnos(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar anos:', error);
    }
  };

  const fetchPreco = async (marcaCodigo: string, modeloCodigo: string, anoCodigo: string): Promise<number> => {
    try {
      const response = await axios.get(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marcaCodigo}/modelos/${modeloCodigo}/anos/${anoCodigo}`);
      return response.data.Valor;
    } catch (error) {
      console.error('Erro ao buscar preço na Tabela Fipe:', error);
      throw new Error('Erro ao buscar preço na Tabela Fipe');
    }
  };

  return (
    <CarContext.Provider value={{ marcas, setMarcas, modelos, setModelos, anos, setAnos, fetchModelos, fetchAnos, fetchPreco  }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = (): CarContextType => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  return context;
};
