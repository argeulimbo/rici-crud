export interface Pagamenot {
    id: string,
    consorcioId: string,
    mesReferencia: string,
    valor: number,
    pago: boolean,
    dataPagamento?: Date;
}
