import {Component, Input, OnInit} from '@angular/core';
import {FileItem} from '../../modelos/file-item';
import {CargaImagenesService} from '../../servicios/carga-imagenes.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  estaSobreElemento = false;
  archivos: FileItem[] = [];

  @Input() productoId: string;

  constructor(private cargaImagenes: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImagenes() {
    this.cargaImagenes.cargarImagenesFirebase(this.archivos, this.productoId);
  }

  limpiarImagenes() {
    this.archivos = [];
  }
}
