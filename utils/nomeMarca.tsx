// utils.ts
import { Marca } from './types';

export const getNomeMarca = (codigoMarca: string, marcas: Marca[]): string => {
  const marca = marcas.find(marca => marca.codigo === codigoMarca);
  return marca ? marca.nome : '';
};
