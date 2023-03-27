import { data } from 'jquery';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../services/users.service';
import { Serre} from '../models/serre'; 
import { Socket } from 'ngx-socket-io';
import bodyParser from 'body-parser';


@Component({
  selector: 'app-accueil-dashboard',
  templateUrl: './accueil-dashboard.component.html',
  styleUrls: ['./accueil-dashboard.component.css']
})
export class AccueilDashboardComponent implements OnInit {

  currentDate:any;
  tempHum: any = []
  serre!: Serre[] ;
  temp12:any
  temp8:any
  temp19:any
  temp!:any[]
  moyTemp:any;
  moyHum:any;
  toit:boolean =true;
  porte:boolean =true;
  arrosage:boolean =false;
  dethier:any;
  temp20: any;
  img:boolean =true;
  t8:any;t12:any;t19:any;h8:any;h12:any;h19:any;
  constructor( private serServe :UsersService, private socket: Socket){}

  ngOnInit(): void {
   

    //recuperation temperature par heur données et calsul des moyenne 
    this.serServe.historique().subscribe((data)=>{
      //console.log(data);
     this.currentDate = new Date().getDate() + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();
     this.dethier = new Date().getDate()-7 + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();
    /*  console.log(this.dethier); */
     
     this.temphum = data as unknown as Temphum[];
     this.temp8 = this.temphum.filter((e:any)=> e.Heure == "08:00:00" && e.Date == this.currentDate)
     this.temp12 = this.temphum.filter((e:any)=> e.Heure == "12:00:00" && e.Date == this.currentDate)
     this.temp19 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" && e.Date == this.currentDate)
     this.temp20 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" || "12:00:00" || "08:00:00" && e.Date == this.dethier && e.Date <= this.currentDate)
    /*  console.log(this.temp20);
      */
   /*   this.temp20.forEach(function (temperature:any) {
      console.log(temperature.temperature);
    });  */

    const t8 = this.temp8[0].temperature;
    const h8 = this.temp8[0].humidite;
    const t12 = this.temp12[0].temperature;
    const h12 = this.temp12[0].humidite;
    const t19 = this.temp19[0].temperature;
    const h19 = this.temp19[0].humidite;

    this.moyTemp = (parseInt(String(this.t8)) + parseInt(String(this.t12)) + parseInt(String(this.t19))) / 3;
    this.moyHum = (parseInt(String(this.h8)) + parseInt(String(this.h12)) + parseInt(String(this.h19))) / 3;
    
    })  
  }

  allumer(){
    this.img = true;
    this.socket.emit('active', '1');
  }

  eteindre(){
    this.img = false;
    this.socket.emit('active', '0');
  }
on_toit_click (){

  this.toit= true;
}
off_toit_click (){
  
    this.toit= false;
  
   }
   on_porte_click (){

    this.porte= true;
  }
  off_porte_click (){
    
      this.porte= false;
    
     }
     on_arrosage_click (){

      this.arrosage= true;
    }
    off_arrosage_click (){
      
        this.arrosage= false;
      
       }
}
