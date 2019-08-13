import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos-container',
  templateUrl: './productos-container.component.html',
  styles: []
})
export class ProductosContainerComponent implements OnInit {
  private mostrarLista: boolean;

  /*avisarListaProductosComponent(visualizarLista: boolean) {
    this.mostrarLista = visualizarLista;
  }*/

  constructor() { }

  ngOnInit() { }

}
