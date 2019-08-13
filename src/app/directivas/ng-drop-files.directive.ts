import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {FileItem} from '../modelos/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input() archivos: FileItem[] = [];
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.prevenirAndDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this.getTransferencia(event);
    if (!transferencia) {
      return;
    }
    this.extraerArchivos(transferencia.files);
    this.prevenirAndDetener(event);
    this.mouseSobre.emit(false);
  }

  private getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private extraerArchivos(listaArchivos: FileList) {
    // tslint:disable-next-line:forin
    for (const prop in Object.getOwnPropertyNames(listaArchivos)) {
      const archivoTemporal = listaArchivos[prop];
      if (this.archivoPuedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
  }

  // Validaciones
  private archivoPuedeSerCargado(archivo: File) {
    if (this.archivoNoExisteEnArray(archivo.name) && this.esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private prevenirAndDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  private archivoNoExisteEnArray(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nomArchivo === nombreArchivo) {
        console.log('El archivo ' + nombreArchivo + ' ya ha sido añadido');
        return false;
      }
    }
    return true;
  }

  private esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

}
