import { Http } from '@angular/http';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-component',
  templateUrl: './post-component.component.html'
})
export class PostComponentComponent implements OnInit {
  private url = "http://jsonplaceholder.typicode.com/posts";
  posts: any[];

  constructor(private http: Http){ }

  ngOnInit() {
    this.http.get(this.url)
        .subscribe(response => {
          this.posts = response.json();
        });
  }

  createPost(input: HTMLInputElement){
    let post = {
      title: input.value
    };
    input.value = '';
    this.http.post(this.url, JSON.stringify(post))
        .subscribe(response => {
          post['id'] = response.json().id;
          this.posts.splice(0, 0, post);
        });
  }

  updatePost(post){
    this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true }))
        .subscribe(response => {
          console.log(response.json());
        })
  }
}
