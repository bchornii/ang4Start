import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

    this.route.paramMap
      .subscribe(params => {
        //..
      });

    this.route.queryParamMap
      .subscribe(params => {
        let pageNum = +params.get('page');
        console.log(pageNum);
      });

    this.service.getAll()
      .subscribe(followers => this.followers = followers);
  }
}
