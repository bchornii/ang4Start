import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html'
})
export class GithubProfileComponent implements OnInit {
  private bsubscriber$: BehaviorSubject<number> = new BehaviorSubject(0);
  private bsubsription: Subscription;
  @ViewChild('profile') profileEl;
  inputEl: FormControl;  

  // name-search-result component data
  names: string[] = ['Ivan', 'Oleh', 'Olexand', 'Ivanka', 'Valentin', 'Vitalii'];

  constructor(private route: ActivatedRoute,
              private router: Router) { 
         
  }

  get counter() {
    return this.bsubscriber$.getValue();
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        let id = +params.get('id');
        let username = params.get('username');
        console.log(`id=${id} username=${username}`);
      });

    this.bsubsription = this.bsubscriber$
    .pipe(      
      tap(value => console.log('intercepted in tap = ' + value))
    )
    .subscribe({
      next: (value) => {
        console.log(`new value posted = ${value}`)
      }
    });    
  }

  submit(){
    console.log(this.profileEl);
    this.router.navigate(['/followers'], {
      queryParams: {
        page: 1,
        order: 'newest'
      }
    });
  }

  onUnsubscribe(){
    this.bsubsription.unsubscribe();    
  }

  onEmit(){    
    let curr = this.bsubscriber$.getValue();
    this.bsubscriber$.next(++curr);            
  }
}
