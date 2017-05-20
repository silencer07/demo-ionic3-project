import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {User} from "../../model/user";
import {Validator} from "validator.ts/Validator";


@Injectable()
export class AuthService {

  constructor() {
  }

  authenticate(user: User): Observable<User>{
    let validator = new Validator();
    let errors = validator.validate(user);
    if(errors.length > 0){
      throw Observable.throw(errors.map(error => error.errorMessage))
    }
    return Observable.of(user);
  }
}
