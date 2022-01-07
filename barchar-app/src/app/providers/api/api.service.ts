import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

private SERVICE_URL  = 'http://localhost:3030/api/get-data'

  constructor( private httpClient: HttpClient) { }

  public get(){
    return new Promise (async (res, rej) => {

      try {
        await this.httpClient.get(this.SERVICE_URL).toPromise().then(data => {
          res(data);
        });
      }
      catch (e){
          rej({mesage: `Error: ${e}`});
      }
    });
  }
}
