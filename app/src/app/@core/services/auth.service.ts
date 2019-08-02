import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public connection: String = 'http://localhost:3000';
  public user: any;
  public authToken: any;
  public options: any;

  constructor(
    public http: Http,
    public router: Router,
    public location: Location,
  ){}

  Authenticate(data){
    console.log( this.connection );
    return this.http.post(`${this.connection}/user/authenticate`, data).map(res => res.json());
  }

  getItemList(){
    return this.http.get(`${this.connection}/user/itemList`).map(res => res.json());
  }

  getSaleList(){
    return this.http.get(`${this.connection}/user/saleList`).map(res => res.json());
  }

  addNewItem(data) {
    return this.http.post(`${this.connection}/user/addItem`, data).map(res => res.json());
  }

  addNewSale(data) {
    return this.http.post(`${this.connection}/user/addSale`, data).map(res => res.json());
  }

  updateItem(id, data) {
    return this.http.put(`${this.connection}/user/updateItem/${id}`, data).map(res => res.json());
  }

  Headers(xdata?){
    return xdata?
      new RequestOptions({
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': this.getToken(),
          'xdata': xdata
        }),
      }):
      new RequestOptions({
        headers: new Headers({
          'Accept': 'application/json',
          'Authorization': this.getToken(),
        }),
      });
  }

 /**
 * @param {String} data server payload / token
 * @return {Promise} Boolean true or false; setting tokens
 */
  public setToken(data){
    return new Promise( (resolve, reject) => {
        try{
          if (typeof(Storage) !== "undefined") {
            for(let prop in data) {
              let
                type = typeof data[prop],
                context = type.toLowerCase() === 'string'?
                data[prop] : JSON.stringify(data[prop]);
                localStorage.setItem(prop, context)
            }
            resolve(true);
          }else{
            reject(false);
          }
        }catch(e){
          console.info(e);
          reject(false);
        }
    });
  }

  /**
   * @return {String} token
   */
  public getToken(){
    return localStorage.getItem('token');
  }

  /**
   * @return {Boolean} if user has token and equals to role
   * true or false
   */
  public hasToken(){
    return this.getToken()?(()=>{this.Observer();return true;})():false;
  }

  /**
   * @return {Void}
   * @description observes routes by role
   */
  public Observer() : void{
    let role = this.getTokenData('role');
    let self = this.router.events.subscribe(nextUrl => {
      if(nextUrl instanceof NavigationEnd){
        if(this.location.path().split('/')[1] !== role){
          self.unsubscribe();
          this.router.navigate([role]);
        }
      }
    });
  }

  /**
   * @param {String} key any object property of signed user
   * @return {String} key value
   */
  public getTokenData(key?){
    try{
      if( this.hasToken ){
        let token = JSON.parse(atob(this.getToken().split('.')[1]));
        if(key){
          switch(typeof key){
            case 'string':
              return token[key]
            case 'object':
              return key.map(k => token[k] );
          }
        }else{ return token; }
      }
    }catch(e){
      this.logout();
      //console.info('Error:', e.message);
    }
  }

  /**
   * @return {Void}
   * @description clear token & user then navigate login
   */
  public logout() : void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public login(){
    this.router.navigate([this.getTokenData('role')]);
  }

}
