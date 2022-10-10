import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut, UserCredential } from "firebase/auth";
import { environment } from 'src/environments/environment';

import { FacebookAuthProvider } from "firebase/auth";
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/Admin';


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  userData?: User;

  adminGlobal:any;

  constructor(private httpClient: HttpClient) { }

  // No funcoina porque no son persistentes los servicios
  getUser(){
    return this.userData;
  }

  /* -----------------------  GOOGLE  ---------------------------------- */

  async getAutenticacion(){
    const app = initializeApp(environment.firebase);

    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const db = getFirestore(app);
    
    const res = await signInWithPopup(auth, provider);
    const res2 = await this.getAutenticacion2(res);
    
    return res2;
  }

  getAutenticacion2(res: UserCredential){

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(res);

      const token = credential!.accessToken;

      // The signed-in user info.
      const user = res.user;

      this.userData = user;

      console.log(user);

      // Local Storage
      localStorage.setItem('userName', user.displayName!);
      localStorage.setItem('userEmail', user.email!);
      localStorage.setItem('userUID', user.uid!);
      localStorage.setItem('userPhone', user.phoneNumber!);
      localStorage.setItem('userPhoto', user.photoURL!);

      return user;

  }

  /* -----------------------  FACEBOOK  ---------------------------------- */

  async getAutenticacionFacebook(){
    const provider = new FacebookAuthProvider();

    const auth = getAuth();

    const res = await signInWithPopup(auth, provider);

    const res2 = await this.getAutenticacion2Facebook(res);

    return res2;
  }

  getAutenticacion2Facebook(result: UserCredential){
      // The signed-in user info.
      const user = result.user;

      this.userData = user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential!.accessToken;

      console.log(user);

      // Local Storage
      localStorage.setItem('userName', user.displayName!);
      localStorage.setItem('userEmail', user.email!);
      localStorage.setItem('userUID', user.uid!);
      localStorage.setItem('userPhone', user.phoneNumber!);
      localStorage.setItem('userPhoto', user.photoURL!);

      return user;
  }

  /* -----------------------  LOGOUT (Arreglar)  ---------------------------------- */

  hacerSignOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  /* -----------------------  OTHER STUFF  ---------------------------------- */

  esAdminLocalStorage(uid:any){
    return this.httpClient.get<Admin>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/admins/'+uid+'.json');
  }

  buscarUsuariosPorID(id:string){
    return this.httpClient.get<any>('https://bibliotecapp-4cf6b-default-rtdb.europe-west1.firebasedatabase.app/users/'+id+'.json');
  }

    /* -----------------------  Más información de usuarios  ---------------------------------- */

}
