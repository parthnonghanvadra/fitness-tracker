import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { TrainingService } from '../training/training.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(private router : Router, private afAuth : AngularFireAuth, private trainingService : TrainingService) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    })
  }

  registerUser(authData : AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, 
      authData.password
      )
      .then((result: any) => {
      })
      .catch((error: any) => {
        console.log(error);
      });
    
  }

  login(authData : AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email, 
      authData.password
      )
      .then((result: any) => {
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
