
export class ParcelaFinanciamento {
    mes: number;
    valorOriginal: number;
    valorAmortizado: number;
    valorJuros: number;
    valorAmortizacaoExtra: number; 
    valorTotalPago: number;
    saldoDevedorRestante: Number;

  
  
    constructor(mes: number, valorOriginal: number, valorAmortizado: number, valorJuros: number, valorAmortizacaoExtra: number, valorTotalPago: number, saldoDevedorRestante: Number) {
      this.mes = mes;
      this.valorOriginal = valorOriginal;
      this.valorAmortizado = valorAmortizado;
      this.valorJuros = valorJuros;
      this.valorAmortizacaoExtra = valorAmortizacaoExtra;
      this.valorTotalPago = valorTotalPago;
      this.saldoDevedorRestante = saldoDevedorRestante;
      
    }
  }
  