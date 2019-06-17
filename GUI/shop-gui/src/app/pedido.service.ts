//import { Produto } from './produto';
import { Pedido } from './pedido';
import { Produto} from './produto'
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProdutoService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private shopURL = 'http://localhost:3000';

    constructor(private http: Http) { }

    criar(pedido: Pedido): Promise<Pedido> {
    return this.http.post(this.shopURL + "/pedido",JSON.stringify(pedido), {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return pedido;} else {return null;}
           })
           .catch(this.tratarErro);
    }

    atualizar(pedido: Pedido): Promise<Pedido> {
        return this.http.put(this.shopURL + "/pedido",JSON.stringify(pedido), {headers: this.headers})
             .toPromise()
             .then(res => {
                if (res.json().success) {return pedido;} else {return null;}
             })
             .catch(this.tratarErro);
      }

      getProdutos(): Promise< Produto[] > {
        return this.http.get(this.shopURL + "/produtos")
                 .toPromise()
                 .then(res => res.json() as Produto[])
                 .catch(this.tratarErro);
      }

      private tratarErro(erro: any): Promise<any>{
        console.error('Acesso mal sucedido ao serviço de produtos',erro);
        return Promise.reject(erro.message || erro);
      }
}