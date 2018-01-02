import { SpinnerState } from './../models/SpinnerState';
import { SpinnerService } from '../services/spinner.service';

import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  spinnerState$: BehaviorSubject<SpinnerState>;

  followers: any[];
  
  constructor(private service: GithubFollowersService,
              private route: ActivatedRoute,
              private spinnerService: SpinnerService) { }

  ngOnInit() {

    let observables = Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]);

    observables
      .switchMap(combined => {
        let paramMap = combined[0];
        let queryParamMap = combined[1];
        let id = paramMap.get('id');
        let pageNum = +queryParamMap.get('page');
        console.log(`id=${id} page=${pageNum}`);

        return this.service.getAll();
      })
      .subscribe(followers => {
        this.followers = followers;
      });

      this.getPercentageCharges((charges) => {
        console.log(charges);
      });

      this.spinnerState$ = this.spinnerService.getSpinnerState();      
      if(this.spinnerState$){
        this.spinnerState$.subscribe({
          next: (spinnerState: SpinnerState) => {
            console.log(SpinnerState[spinnerState])
          }
        });        
      }

      this.getSubject()
          .subscribe({
            next: () => {
              console.log('getSubject.next is get called');
            }
          });

      this.getObservable()      
          .subscribe({
            next: () => console.log('getObservable.next is called')
          });

      this.getBehaviourSubject()
          .subscribe({
            next: (obj) => console.log(`getBehaviourSubject.next is called with value=${obj.value}`)
          });          
  }

  private getSubject(): Subject<any>{
    let s = new Subject<any>();    
    setTimeout(() => s.next(), 2000);
    return s;
  }

  private getObservable(): Observable<any> {
    return new Observable(subscribe => {
      setTimeout(() => subscribe.next(), 2000);
    });
  }

  private getBehaviourSubject() : BehaviorSubject<any> {
    return new BehaviorSubject({
      value: 91
    });
  }

  private getPercentageCharges(success: Function): void {    
    //this.spinnerService.showSpinner();
    this.getDataDomain()
        .subscribe({
          next: (data) => {
            //this.spinnerService.hideSpinner();            

            // here will be complex logic where methods depends on each other
            //this.spinnerService.showSpinner();
            this.getDataDomain()
                .subscribe({
                  next: (dt1) => {
                    //this.spinnerService.hideSpinner()
                    let amount = dt1.chargeAmount * data.chargeAmount;
                    success(amount);
                  }                  
                });            
          },
          error: (err) => console.log(err)          
        });        
  }

  private getDataDomain() : Subject<any>{
    let subj = new Subject<any>();
    this.getDataHttp(
      resp => {
        subj.next(resp)
      },
      error => subj.error(error)
    );
    return subj;
  }

  private getDataHttp(success: Function, error: Function){
    this.invokeHttpGet({
      url: 'home',
      success: success,
      error: error
    });
  }

  private invokeHttpGet(requestData: any): void{
    this.getHttp().subscribe({
      next: (resp) => this.parseSuccessResponse(requestData.success, requestData.url, resp),
      error: (resp) => this.parseErrorResponse(requestData.error, resp)
    });
  }

  private parseSuccessResponse(success: Function, url: string, resp: any){
    if(success){
      success(this.convert(resp, url));
    }
  }

  private parseErrorResponse(error: Function, resp: any){
    if(error){
      error(resp);
    }
  }

  private convert(data: any, url: string) {
    switch(url){
      case 'home': 
        return {
          chargeAmount: data.charge_amount,
          chargeName: data.charge_name
        };
    }
  }

  // Angluar level service method http.get
  private getHttp(throwErr?: boolean){
    return new Observable(observer => {      
      setTimeout(() => {
        if(throwErr){
          observer.error('some error');
        } else {
          observer.next({
            charge_name: 'Monthly',
            charge_amount: 99.95
          });
        }        
      }, 4000);
    });
  }
}