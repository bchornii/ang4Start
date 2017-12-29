import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SpinnerState } from '../models/SpinnerState';

@Injectable()
export class SpinnerService {
  private spinnerState$: BehaviorSubject<SpinnerState> 
    = new BehaviorSubject(SpinnerState.Hidden);

  hideSpinner(){
    this.spinnerState$.next(SpinnerState.Hidden);
  }

  showSpinner(){
    this.spinnerState$.next(SpinnerState.Visible);
  }

  getSpinnerState(){
    return this.spinnerState$;
  }
}
