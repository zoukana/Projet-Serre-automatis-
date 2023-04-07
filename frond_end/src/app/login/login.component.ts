import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { WebsocketService } from '../services/websocket.service';

import { io } from 'socket.io-client';

import { Temp_Humid } from '../services/interfaces/movie';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;
  verifPass: any = true;
  invalid= false;
  errorMsg:any;
  


  constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router, private websocketService: WebsocketService) {
    
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    
      email:['',[Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      
      password:['',[Validators.required,Validators.minLength(8)]],
      
      })
    this.websocketService.token().subscribe({
      next:(data)=>{
        console.log(data)
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.route.navigateByUrl('acceuil')
      }
    });
    this.websocketService.nom().subscribe({
      next:(data)=>{
        console.log(data)
        localStorage.setItem('nom', JSON.stringify(data));
       
      }
    });
    this.websocketService.prenom().subscribe({
      next:(data)=>{
        console.log(data)
        localStorage.setItem('prenom', JSON.stringify(data));
       
      }
    });
    this.websocketService.email().subscribe({
      next:(data)=>{
        console.log(data)
        localStorage.setItem('email', JSON.stringify(data));
       
      }
    });



      this.websocketService.arduino().subscribe({
        next:(data)=>{
          
          
         
      
        }
        
      })
       
  }

  
onSubmit(){
this.submitted = true
this.spin = true

 if(this.registerForm.invalid){
 /*  this.spin = false */
  return ;
} 

 /* /insertion sur la base de données/ */
  const user ={
 
   email : this.registerForm.value. email,
   password: this.registerForm.value. password,
  
  }
  
  //Redirection apres la connexion
  this.userService.getConnexion(user).subscribe(
   data=>{
     /*  console.log(data) */
          this.route.navigateByUrl('acceuil')
   
    }, 
    /* verifie si l'utilisateur n'est pas dans la base de donnée ou l'utilisateur est archiver */
    
   );
}
}