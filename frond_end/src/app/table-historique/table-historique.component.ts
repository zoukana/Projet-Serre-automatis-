import { data } from 'jquery';

import { Component, OnInit } from '@angular/core';
import { Serre } from '../models/serre'; 
/* import { SocketService } from '../meteo.service'; */
import { io } from 'socket.io-client';
import { Temp_Humid } from '../services/interfaces/movie';
import { BehaviorSubject, from } from 'rxjs';
import { UsersService } from '../services/users.service';
import histo from '../histo.json';

export interface donne{
temperature:string;
humidite_sol:string;
humidite_serre:string;
}


@Component({
  selector: 'app-table-historique',
  templateUrl: './table-historique.component.html',
  styleUrls: ['./table-historique.component.css']
}) 
export class TableHistoriqueComponent implements OnInit{
 /* Declaration des variables */
 Serre!: Serre[] ;
 temp! :any [];
 currentDate!: any;
 temp7h: any;
 temp18h: any;
 
 temp20: any;
last: any;
 dethierr: any;
 moyTemp!: number;
 moyHum!: number;
searchText!: string;
itemsperpage: number =5;
p: number = 1;
show:boolean = false;
hist:donne[]= histo


	constructor(private serre:UsersService) { }// importation du service 
  ngOnInit()  {
   
/* Fonction pour la recuperation des données humidité et temperature */
    this.serre.historique().subscribe((data)=>{
      //console.log(data);
     this.currentDate = new Date().getDate() + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear();// recuperation date actuelle
     this.last = new Date().getDate()-7 + '/' + new Date().getMonth() +1 + '/'+  new Date().getFullYear(); // recuperation date du semaine derniere
    
   
     this.Serre= data as unknown as Serre[];
     this.temp7h = this.Serre.filter((e:any)=> e.Heure == "08:00:00" && e.Date == this.currentDate)
     this.temp18h = this.Serre.filter((e:any)=> e.Heure == "12:00:00" && e.Date == this.currentDate)
    /*  this.temp19 = this.temphum.filter((e:any)=> e.Heure == "19:00:00" && e.Date == this.currentDate)
     this.temp20 = this.temphum.filter((e:any)=> e.Heure == "08:00:00"   && e.Date > this.last && e.Date <= this.currentDate  && e.Date !== this.last ) */
    /*  console.log(this.temp20); */
     
    /*  this.temp20.forEach(function (temperature:any) {
      console.log(temperature.temperature);
    });  */

    const t7 = this.temp7h[0].temperature;
    const h7 = this.temp7h[0].humidite;
    const t18 = this.temp18h[0].temperature;
    const h18 = this.temp18h[0].humidite;
  
    this.moyTemp = (parseInt(String(t7)) + parseInt(String(t18)) ) / 2;
    this.moyHum = (parseInt(String(h7)) + parseInt(String(h18)) ) / 2;
    
    })     
     
  }
  public afficher():void{
    this.show = !this.show;
  }
}




