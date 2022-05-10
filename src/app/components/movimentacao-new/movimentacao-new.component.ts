import { Component, OnInit } from '@angular/core'
import { CorrentistaService } from 'src/app/services/correntista.service'
import { MovimentacaoService } from 'src/app/services/movimentacao.service'
import { NgToastService } from 'ng-angular-popup'

@Component({
  selector: 'app-movimentacao-new',
  templateUrl: './movimentacao-new.component.html',
  styleUrls: ['./movimentacao-new.component.css']
})
export class MovimentacaoNewComponent implements OnInit {
  dataHora: any
  descricao: any
  valor: any
  tipo: any

  correntistas: any
  correntista: any

  constructor (
    private movimentacaoService: MovimentacaoService,
    private correntistaService: CorrentistaService,
    private toast: NgToastService
  ) {}

  ngOnInit (): void {
    this.exibirCorrentistas()
  }
  exibirCorrentistas (): void {
    this.correntistaService.list().subscribe(
      data => {
        this.correntistas = data
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
  save (): void {
    console.log(this.correntista)
    const movimentacao = {
      valor: this.valor,
      descricao: this.descricao,
      tipo: this.tipo,
      idConta: this.correntista.id,
      dataHora: this.dataHora
    }

    console.log(movimentacao)
    this.movimentacaoService.create(movimentacao).subscribe(
      response => {
        console.log(response)
        this.toast.success({
          detail: 'Sucess Message',
          summary: 'Movimentação feita com sucesso',
          duration: 3000
        })
      },
      err => {
        console.log(err)
        this.toast.error({
          detail: 'Error Message',
          summary: 'Erro ao realizar a movimentação',
          duration: 3000
        })
      }
    )
  }
}
