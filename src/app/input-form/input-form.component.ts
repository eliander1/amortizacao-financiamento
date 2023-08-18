import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosFinanciamento } from '../models/dados-financiamento.component';
import { listaParcelas } from '../utils/utils';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {
  dadosForm!: FormGroup;
  dadosFinanciamento!: DadosFinanciamento;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.dadosForm = this.formBuilder.group({
      valorFinanciado: ['', Validators.required],
      taxaJuros: ['', Validators.required],
      correcaoIPCATR: [''],
      prazoPagamento: ['', Validators.required],
      amortizacaoExtra: [''],
      valorPagamentoMensal: [0] 
    });
  }

  onSubmit() {
    if (this.dadosForm.valid) {

      listaParcelas.length = 0;

      this.dadosFinanciamento = this.dadosForm.value;

      this.calcularParcelaPrice(this.dadosFinanciamento.valorFinanciado, this.dadosFinanciamento.taxaJuros, this.dadosFinanciamento.prazoPagamento, this.dadosFinanciamento.valorPagamentoMensal)
    }
  }

 
  calcularParcelaPrice(montante: number, taxaJuros: number, prazo: number, valorPagamentoMensal: number): void {
    const taxaJurosMensal = taxaJuros / 100 / 12;
    const parcelas = prazo;
    let saldoDevedor = montante;
    let amortizacaoExtraAcumulada = 0;
  
    for (let i = 1; i <= parcelas; i++) {      
      const jurosParcela = saldoDevedor * taxaJurosMensal;

      const valorParcela =   (montante * taxaJurosMensal * Math.pow(1 + taxaJurosMensal, parcelas)) /
      (Math.pow(1 + taxaJurosMensal, parcelas) - 1);

      const amortizacaoParcela = valorParcela - jurosParcela;
  
      saldoDevedor -= amortizacaoParcela;
      const amortizacaoExtra = Math.max(valorPagamentoMensal - valorParcela, 0);
      saldoDevedor -= amortizacaoExtra;
      amortizacaoExtraAcumulada += amortizacaoExtra;
  
      listaParcelas.push({
        mes: i,
        valorOriginal: valorParcela,
        valorJuros: jurosParcela,
        valorAmortizado: amortizacaoParcela,
        valorAmortizacaoExtra: amortizacaoExtra,
        valorTotalPago: valorParcela + amortizacaoExtra,
        saldoDevedorRestante: saldoDevedor
      });
    }
  
    console.log(listaParcelas);
  }
  

  
}
