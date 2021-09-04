import { Http ,Headers } from '@angular/http';
import { Injectable } from '@angular/core';

const baseUrl = "https://young-atoll-91930.herokuapp.com/"

@Injectable()
export class ApiCallsProvider {

  constructor(public http: Http) {}

  getContacts()
  {
    let apiUrl = baseUrl+'viewContacts'
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.get(apiUrl, {headers: headers}).
      subscribe(res =>{
        resolve(res.json()); 
      }, (err) =>{
        reject(err);
      });
  
    });
  }

  addContact(data)
  {
    let apiUrl = baseUrl+'addContact'
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl,data, {headers: headers}).
      subscribe(res =>{
        resolve(res.json()); 
      }, (err) =>{
        reject(err);
      });
  
    });
  }

  deleteContact(data)
  {
    let apiUrl = baseUrl+'deleteContact'
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      this.http.post(apiUrl,data, {headers: headers}).
      subscribe(res =>{
        resolve(res.json()); 
      }, (err) =>{
        reject(err);
      });
  
    });
  }

}
