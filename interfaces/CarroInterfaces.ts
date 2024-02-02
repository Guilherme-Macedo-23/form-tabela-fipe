export interface Marca {
    codigo: string;
    nome: string;
  }
  
  export interface Modelo {
    codigo: string;
    nome: string;
    modelos?: Modelo[];
  }
  
  export interface Ano {
    codigo: string;
    nome: string;
  }
  
  export interface Carro {
    marca: Marca;
    modelo: Modelo;
    ano: Ano;
    precoTabelaFipe: number | null;
}
  