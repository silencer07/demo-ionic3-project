import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import _ from "lodash";
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthService {

  private static AUTHENTICATED_USER_KEY = 'DEMO_PROJECT_USER_KEY';
  private static AUTHENTICATED_CREDENTIALS_KEY = 'DEMO_PROJECT_CREDENTIALS_KEY';
  private _user: User = null;

  constructor(private storage: Storage) {
    this.storage.get(AuthService.AUTHENTICATED_USER_KEY).then((val: string) => {
      // console.log("stored user:" + val + ", " + !_.isNull(val));
      if(!_.isNull(val)){
        this._user = JSON.parse(val);
      }
    });
    //TODO check if session is still valid, if no delete the stored user and unset the _user(maybe will call an endpoint)
  }

  authenticate(cred: EmailCredentials): Observable<User>{
    let body: any = {
      username : cred.username,
      password: cred.password,
    };

    return Observable.of(this._user);

    // return this.http.post(AuthService.LOGIN_ENDPOINT, body).map((res: Response) => {
    //   let json = res.json();
    //   this._user = _.merge(this._user, json);
    //   this.storage.set(AuthService.AUTHENTICATED_USER_KEY, JSON.stringify(this._user));
    //   if(cred.rememberMe){
    //     this.storage.set(AuthService.AUTHENTICATED_CREDENTIALS_KEY, JSON.stringify(cred));
    //   } else {
    //     this.storage.remove(AuthService.AUTHENTICATED_CREDENTIALS_KEY);
    //   }
    //   return this._user;
    // });
  }

  get user(): Observable<User> {
    // if(!this._user){
    //   return Observable.fromPromise(this.storage.get(AuthService.AUTHENTICATED_USER_KEY)).map((val: string) => {
    //     if(!_.isNull(val)){
    //       this._user = _.merge(this._user, JSON.parse(val));
    //     }
    //     return this._user;
    //   });
    // }
    return Observable.of(this._user);
  }

  logout(){
    this.storage.remove(AuthService.AUTHENTICATED_USER_KEY).then(() => this._user = null);
  }

  get storedCredentials(): Observable<EmailCredentials> {
    return Observable.fromPromise(this.storage.get(AuthService.AUTHENTICATED_CREDENTIALS_KEY))
      .map((cred: any) => JSON.parse(cred));
  }
}

export interface EmailCredentials {
  username: string;
  password: string;
  rememberMe ?: string;
}
