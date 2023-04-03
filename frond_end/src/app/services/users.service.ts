import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { env } from 'src/env';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { Serre} from '../models/serre';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private httpClient:HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse((localStorage.getItem('currentUser')!)));
   /*  if (this.currentUserSubject.value == null) {
      this.getLogOut();
      this.router.navigateByUrl('login');
    } */
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getConnexion(user:User){
    return this.httpClient.post<User>(`${env.apiUrl}/login`,user).
      pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
       /*  console.log(user.data)  */
        localStorage.setItem('currentUser', JSON.stringify(user.data?.token));
        localStorage.setItem('email', JSON.stringify(user.data?.email));
        localStorage.setItem('prenom', JSON.stringify(user.data?.prenom));
        localStorage.setItem('nom', JSON.stringify(user.data?.nom));




        this.currentUserSubject.next(user);
        return user;
      }));

  }

  
  getToken() {
    return localStorage.getItem('currentUser');
  }
  getPrenom() {
    return localStorage.getItem('prenom');
  }
  getnom() {
    return localStorage.getItem('nom');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('currentUser');
    return authToken !== null ? true : false;
  }

  getLoggedIn(){

    if(!this.currentUserValue) {
      return false;
    }
    return localStorage.getItem('role');
  }

  getUsers(){
    return this.httpClient.get(`${env.apiUrl}/getAll`)
  };
  /* getData(){
    return this.httpClient.get<Serre>(`${env.apiUrl}/pap`)
  }; */


  historique(){
    return this.httpClient.get(`${env.apiUrl}/pap`)
  };

/*   changeRole(id:any,user: User){
   
    return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  };


  modifUsers(id:any,user: User){
   
    return this.httpClient.patch<User>(`${env.apiUrl}/update/${id}`,user);
  }
 */
  addUsers(user: User){
    return this.httpClient.post<User>(`${env.apiUrl}/post`,user);
  }

  getLogOut(){
  localStorage.removeItem('currentUser');
    localStorage.removeItem('prenom');
    localStorage.removeItem('nom');
  localStorage.removeItem('email');

  // this.router.navigate(['']);

    // if (removeToken == null && removeprenom == null &&  removenom == null && removemail == null) {
    // }
  }
 /*  getRole(){
    return localStorage.getItem('role');
  } */
}


