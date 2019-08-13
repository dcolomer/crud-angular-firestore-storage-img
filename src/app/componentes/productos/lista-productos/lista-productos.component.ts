import {Component, OnInit, Input} from '@angular/core';
import { Producto } from 'src/app/modelos/producto';

import { ProductosService } from 'src/app/servicios/productos.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  private productos: Producto[];
  @Input() private mostrarLista: boolean;
  private loading;

  constructor(private productosService: ProductosService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loading = true;
    this.productosService.getProductos().subscribe(datos => {
      this.productos = datos;
      this.loading = false;
    });
  }

  onEdit(producto: Producto) {
    /*
      Si hiciéramos lo siguiente:
        this.productosService.productoEnCurso = producto;
      estaríamos creando un binding entre el producto de la fila en curso de
      la tabla y el producto que se estuviera editando en ProductoFormComponent.
      Este binding haría que tal como se va editando, se apreciara el cambio en la tabla y
      aunque esta funcionalidad es muy interesante, en nuestro caso es contraproducente, ya que
      el usuario al ver los cambios en vivo en la tabla, podría pensar que las modificaciones
      en el formulario ya están salvadas, cuando solo se guardan al pulsar el botón Guardar.

      Por tanto, para evitar una posible pérdida de datos o confusión, utilizaremos lo siguiente,
      ya que no crea un vínculo entre referencias, pues se limita a clonar valores:
        Object.assign(origen, destino)
      Copiar los valores de todas las propiedades enumerables de uno
      o más objetos fuente a un objeto destino.
      Retorna el objeto destino
     */
    this.productosService.productoEnCurso = Object.assign({}, producto);
  }

  onDelete(idProducto: string) {
    Swal.fire({
      title: '¿Estás seguro de borrar el producto?',
      text: `¡Esta acción no se puede deshacer!`,
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      background: 'indianred',
      width: '24rem',
      allowOutsideClick: false,
      confirmButtonColor: 'red',
      reverseButtons: true,
      focusConfirm: false
    }).then( resp => {
      if (resp.value) {
        this.productosService.eliminarProducto(idProducto);
        this.toastr.warning('Operación correcta', 'Producto eliminado');
      }
    });
  }
}
