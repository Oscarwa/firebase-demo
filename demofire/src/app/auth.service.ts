import { Injectable } from '@angular/core';

import { AngularFireAuth, AUTH_PROVIDERS } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  credential: any;
  authState: any = null;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.authState = firebaseAuth.authState;
  }

  signup(): void {
    this.firebaseAuth
      .auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(value => {
        this.credential = value;
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }

  // login(email: string, password: string) {
  //   this.firebaseAuth
  //     .auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Nice, it worked!');
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong:',err.message);
  //     });
  // }


  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }
}
