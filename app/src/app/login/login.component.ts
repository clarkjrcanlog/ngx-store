import { Component, OnInit } from '@angular/core';
import { AuthService } from '../@core/services/auth.service';

@Component({
  selector: 'ngx-login-page',
  styleUrls: ['login.component.scss'],
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit{

  public User: any = { username:'', password: '' }
  public message: any;

  constructor(public auth: AuthService){}
  ngOnInit() {}
  
  Login(){
    let data = this.User;
    this.auth.Authenticate(data).subscribe( async response => {

      if( response.success ){
        console.log(response);
        if( await this.auth.setToken(response.data) ){
            this.auth.login();
            // this.changeStatus(true, response.data.user.id);
        }else{
            this.message = 'LocalStorage not supported. Token not set!';
        }
      }else{
          this.message = response.message;
      }
      
    });
  }




}
