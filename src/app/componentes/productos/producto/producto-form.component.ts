import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ProductosService } from '../../../servicios/productos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styles: [
    `div { background-color: gainsboro; }`
  ]
})
export class ProductoFormComponent implements OnInit {
  private mostrarLista = false;
  @Output() private eventoEstadoVisualizacionLista: EventEmitter<boolean>;

  constructor(private productosService: ProductosService, private toastrService: ToastrService) {
    this.eventoEstadoVisualizacionLista = new EventEmitter<boolean>();
  }

  ngOnInit() { }

  onSubmit() {
    const prodActual = this.productosService.productoEnCurso;
    if (prodActual.id === '') {
      // Quitamos la propiedad id porque si Firebase la ve
      // entonces no genera una automáticamente
      delete prodActual.id;
      this.productosService.nuevoProducto(prodActual);
      this.toastrService.success('Operación correcta', 'Producto creado');
    } else {
      this.productosService.actualizarProducto(prodActual);
      this.toastrService.success('Operación correcta', 'Producto modificado');
    }
  }

  resetForm() {
    this.productosService.refrescarProductoActual();
  }

  toogleLista() {
    this.mostrarLista = !this.mostrarLista;
    this.eventoEstadoVisualizacionLista.emit(this.mostrarLista);
  }

}
