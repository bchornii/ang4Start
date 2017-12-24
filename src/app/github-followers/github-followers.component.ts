import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

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

    observables.subscribe(combined => {
      let paramMap = combined[0];
      let queryParamMap = combined[1];

      let id = paramMap.get('id');
      let pageNum = +queryParamMap.get('page');

      console.log(`id=${id} page=${pageNum}`);

      // use route data to get info from server
      this.service.getAll()
        .subscribe(followers => this.followers = followers);
    });
  }
}
