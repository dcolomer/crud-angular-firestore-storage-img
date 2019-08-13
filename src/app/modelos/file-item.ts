export class FileItem {
  archivo: File;
  nomArchivo: string;
  url: string; // Nos la proporcionará Firebase
  uploading: boolean;
  progress: number;

  constructor(file: File) {
    this.archivo = file;
    this.nomArchivo = file.name;
    this.uploading = false;
    this.progress = 0;
  }
}
