import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { env } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  endpoint: string = 'http://localhost:3001';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private socket:Socket,private http: HttpClient, public router: Router, private httpClient: HttpClient ) { }
  arduino(){
    console.log('socket service');

 return this.socket.fromEvent('rfid')
  }
  token(){
    return this.socket.fromEvent('token')
  }
  nom(){
    return this.socket.fromEvent('nom')
  }
  prenom(){
    return this.socket.fromEvent('prenom')
  }
  email(){
    return this.socket.fromEvent('email')
  }
  //recuperer données
  getDatas() {
    return this.http.get(`${this.endpoint}/`)
  }
  getrfid(rfid:any){
    return this.httpClient.post<any>(`${env.apiUrl}/rfid`,rfid)
  }
  }
