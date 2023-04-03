import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

import { io } from 'socket.io-client';
import { Temp_Humid } from '../services/interfaces/movie';

@Component({
  selector: 'app-modif',
  templateUrl: './modif.component.html',
  styleUrls: ['./modif.component.css']
})
export class ModifComponent {


  registerForm!:FormGroup;
  title = 'angularvalidate';
  submitted = false;
  errorSms:any;
  spin= false;
  verifPass:any = true;
  //emailUser = localStorage.getItem('email')?.replace(/['"]+/g, '');


  constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router,) {
    this.registerForm = this.formBuilder.group({
    
      password:['',[Validators.required,]],
      password2:['',[Validators.required,]],
      password3:['',[Validators.required,]],
      
      }) 
      
  }
  
  ngOnInit() {
    
  
     

      
       
  }

  
onSubmit(){

this.submitted = true
this.spin = true

 if(this.registerForm.invalid){
  this.spin = false
  return ;

} 
console.log(this.registerForm.value);

 const user = {
  nouveau: this.registerForm.value.password,
  ancien: this.registerForm.value.password3

 }

 const id1= localStorage.getItem('id')?.replace(/"/g, '');
 const id = id1?.split('').join('')  //'64233837a90c6e0cd7a3ded5'
  console.log(user);
  
   return this.userService.modifUsers(id,user).subscribe(res=>{
   
        console.log(res);
        
   },)
   
}

checkPassword = () => {

  let pass1 = this.registerForm.value.password//(<HTMLInputElement>document.getElementById("pass1")).value;
  let pass2 = this.registerForm.value.password2//(<HTMLInputElement>document.getElementById("pass2")).value;
/* 
  console.log(pass1 != pass2) */

  if (pass1 != pass2) {
    this.verifPass = false;
   

    setTimeout(() => { this.verifPass = true }, 3000);
  }
 
}

}


