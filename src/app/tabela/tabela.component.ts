import { Component } from '@angular/core';
import { listaParcelas } from '../utils/utils';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent {
  title = 'financiamento';
  
  listaParcelas = listaParcelas;

  linhaCor = 'linha-branca';


  linhaCinzaOuBranca() {
    this.linhaCor = this.linhaCor === 'linha-branca' ? 'linha-cinza' : 'linha-branca';
    return this.linhaCor;
  }
  
  
}
