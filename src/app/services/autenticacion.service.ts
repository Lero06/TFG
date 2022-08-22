import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, User, signOut, UserCredential } from "firebase/auth";
import { environment } from 'src/environments/environment';

import { FacebookAuthProvider } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  userData?: User;

  constructor() {}

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
      localStorage.setItem('userPhone', user.phoneNumber!);
      localStorage.setItem('userPhoto', user.photoURL!);

      return user;
  }
}
