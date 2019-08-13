import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  public usuario: any = { };

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        return;
      } else {
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.foto = user.photoURL;
        this.usuario.correo = user.email;
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }
}
