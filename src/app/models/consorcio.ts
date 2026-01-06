export interface Consorcio {
    id?: any,
    clienteId: string,
    tipo: 'imovel' | 'veiculo' | 'servico' | 'outros',
    valorCredito: number,
    prazoMeses: number,
    valorParcela: number,
    grupo: string,
    cota: string,
    dataInicio: Date,
    status: 'em_andamento' | 'contemplado' | 'cancelado' | 'encerrado';
}