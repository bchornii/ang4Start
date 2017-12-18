import { Http } from '@angular/http';

import { Component } from '@angular/core';

@Component({
  selector: 'post-component',
  templateUrl: './post-component.component.html'
})
export class PostComponentComponent {
  posts: any[];

  constructor(private http: Http){
    http.get('http://jsonplaceholder.typicode.com/posts')
        .subscribe(response => {
          this.posts = response.json();
        });
  }
}
