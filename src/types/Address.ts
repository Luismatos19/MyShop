export interface Address {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    [key: string]: any;
}