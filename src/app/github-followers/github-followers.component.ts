import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';


@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(private service: GithubFollowersService,
              private route: ActivatedRoute) { }

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

    this.getStubData(12)
        .subscribe(
          value => {
            console.log(value);
          },
          error => {
            console.log(error);
          });
  }

  private getStubData(value: number) : Observable<any> {
    return new Observable(observer => {
      if(value > 20){
         observer.error("ppc")
      }
      setTimeout(() => {
        observer.next(12345);
        observer.complete();
      }, 5000);
    });
  }

}
