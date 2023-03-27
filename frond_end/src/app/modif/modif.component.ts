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
  verifPass: any = true;
  


  constructor(private userService : UsersService, private formBuilder: FormBuilder ,private route: Router,) {
    
  }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
    
      email:['',[Validators.required,Validators.email]],
      
      password:['',[Validators.required,Validators.minLength(8)]],
      
      })
  
     

      
      
    

       
  }

  
onSubmit(){
this.submitted = true
this.spin = true

 if(this.registerForm.invalid){
  this.spin = false
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
      if (data.data?.roles.replace(/['"]+/g, '') == "Admin" || data.data?.roles.replace(/['"]+/g, '') == "Utilisateur") {
          this.route.navigateByUrl('acceuil')
          this.spin = true
      } 
    }, 
    /* verifie si l'utilisateur n'est pas dans la base de donnée ou l'utilisateur est archiver */
    error=>{
     /*  console.log(error) */
    /*  console.log(error) */
      if(error == 'Unauthorized'){
        this.errorSms ='Cette utilisateur est archivé'
        this.spin = false
        setTimeout(()=>{ this.errorSms = false}, 3001); 
      }else {
      this.errorSms ='Vous  etes pas dans la base de données'
      this.spin = false
      setTimeout(()=>{ this.errorSms = false}, 3001); 
    }
    }
   );
}


checkPassword = () => {

  let pass1 = this.registerForm.value.password//(<HTMLInputElement>document.getElementById("pass1")).value;
  let pass2 = this.registerForm.value.password2//(<HTMLInputElement>document.getElementById("pass2")).value;
/* 
  console.log(pass1 != pass2) */

  if (pass1 != pass2) {
    this.verifPass = false;
    this.registerForm = this.formBuilder.group(
      {

        password: [''],
        password2: [''],

      })

    setTimeout(() => { this.verifPass = true }, 3001);
  }
  
}
}

