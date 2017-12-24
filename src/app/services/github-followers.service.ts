import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AppError } from '../common/app-error';

@Injectable()
export class GithubFollowersService {
  private url = "https://api.github.com/users/mosh-hamedani/followers";

  constructor(private http: Http) { }

  getAll(){
    return this.http.get(this.url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(new AppError(error));
  }
}
