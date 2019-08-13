import {Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Producto} from '../modelos/producto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private dbRef: AngularFirestoreCollection<Producto>;
  private docRef: AngularFirestoreDocument<Producto>;
  private productos$: Observable<Producto[]>;
  private productoActual: Producto;

  constructor(private afs: AngularFirestore) {
    this.dbRef = afs.collection<Producto>('productosDB');

    // La siguiente instrucción es aceptable cuando no necesitamos los ID's de los documentos (registros)
    // this.productos$ = this.dbRef.valueChanges();

    // Como necesitamos los ID's de los documentos tenemos que usar snapshotChanges()
    this.productos$ = this.dbRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.refrescarProductoActual();
  }

  get productoEnCurso(): Producto {
    return this.productoActual;
  }

  set productoEnCurso(producto: Producto) {
    this.productoActual = producto;
  }

  getProductos(): Observable<Producto[]> {
    return this.productos$;
  }

  nuevoProducto(producto: Producto) {
    this.dbRef.add(producto);
    this.refrescarProductoActual();
  }

  actualizarProducto(producto: Producto) {
    const idProd = producto.id;
    this.docRef = this.afs.doc<Producto>(`productosDB/${idProd}`);
    this.docRef.update(producto);
    this.refrescarProductoActual();
  }

  eliminarProducto(idProd: string) {
    this.docRef = this.afs.doc<Producto>(`productosDB/${idProd}`);
    this.docRef.delete();
    this.refrescarProductoActual();
  }

  refrescarProductoActual() {
    // El servicio mantiene esta propiedad para transferir al formulario
    // un producto seleccionado de la lista para su modificación
    this.productoActual = { id: '', descripcion: '', precio: 0 };
  }
}


