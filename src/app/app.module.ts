import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';

// Toastr
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ProductoFormComponent } from './componentes/productos/producto/producto-form.component';
import { ProductosContainerComponent } from './componentes/productos/productos-container.component';
import { ListaProductosComponent } from './componentes/productos/lista-productos/lista-productos.component';
import { LoadingComponent } from './componentes/loading/loading.component';
import { LoginComponent } from './componentes/login/login.component';
import { FileUploadComponent } from './componentes/file-upload/file-upload.component';
import { VisorComponent } from './componentes/visor/visor.component';

// Directivas
import { NgDropFilesDirective } from './directivas/ng-drop-files.directive';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ProductoFormComponent,
    ProductosContainerComponent,
    ListaProductosComponent,
    LoadingComponent,
    LoginComponent,
    FileUploadComponent,
    NgDropFilesDirective,
    VisorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ToastrModule.forRoot(environment.toastrConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
