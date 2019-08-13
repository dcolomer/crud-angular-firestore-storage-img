import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FileItem} from '../modelos/file-item';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';
  private downloadURL: Observable<string>;
  private progreso: Observable<number>;

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) { }

  cargarImagenesFirebase(imagenes: FileItem[], productoId: string) {
    for (const item of imagenes) {
      const file = item.archivo;
      const filePath = `${this.CARPETA_IMAGENES}/${item.nomArchivo}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.progreso = task.percentageChanges();
      this.progreso.subscribe((resp: number) => item.progress = resp);
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((resp: string) => {
            const objImagen = {
              nombre: item.nomArchivo,
              url: resp,
              productoId
            };
            this.guardarAsociacionProductoImagen(objImagen);
          });
        })
      ).subscribe();
    }
  }

  private guardarAsociacionProductoImagen(objImagen: { nombre: string, url: string, productoId: string }) {
    this.db.collection(`/${ this.CARPETA_IMAGENES }`)
      .add(objImagen);
  }

}
