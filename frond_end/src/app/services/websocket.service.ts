import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Router } from '@angular/router';
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
  //recuperer données
  getDatas() {
    return this.http.get(`${this.endpoint}/`)
  }
  getrfid(rfid:any){
    return this.httpClient.post<any>(`${env.apiUrl}/rfid`,rfid)
  }
  }
