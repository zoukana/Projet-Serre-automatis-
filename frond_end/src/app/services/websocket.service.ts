import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { env } from 'src/env';
import { Serre } from '../models/serre';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  endpoint: string = 'http://localhost:3001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  private currentUserSubject: BehaviorSubject<User>;
  constructor(private socket:Socket,private http: HttpClient, public router: Router, private httpClient: HttpClient,private serServe :UsersService, ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse((localStorage.getItem('currentUser')!)));
  }
  arduino(){
    console.log('socket service');

 return this.socket.fromEvent('rfid')
  }
  //recuperer données
  getDatas() {
    return this.http.get(`${this.endpoint}/`)
  
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getrfid(rfid:Serre){
    return this.httpClient.post<User>(`${env.apiUrl}/rfid`,rfid).
    pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      /* console.log(user.data) */
      localStorage.setItem('currentUser', JSON.stringify(user.data?.token));
      localStorage.setItem('email', JSON.stringify(user.data?.email));
      localStorage.setItem('prenom', JSON.stringify(user.data?.prenom));
      localStorage.setItem('nom', JSON.stringify(user.data?.nom));




      this.currentUserSubject.next(user);
      return user;
    }));


  }
  }
