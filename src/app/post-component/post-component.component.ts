import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'post-component',
  templateUrl: './post-component.component.html'
})
export class PostComponentComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService){ }

  ngOnInit() {
    this.postService.getPosts()
        .subscribe(
          response => {
            this.posts = response.json();
          },
          error => {
            alert('An error occured.');
            console.log(error);
          });
  }

  createPost(input: HTMLInputElement){
    let post = {
      title: input.value
    };
    input.value = '';
    this.postService.createPost(post)
        .subscribe(
          response => {
            post['id'] = response.json().id;
            this.posts.splice(0, 0, post);
          },
          error => {
            alert('An error occured.');
            console.log(error);
          });
  }

  updatePost(post){
    this.postService.updatePost(post)
        .subscribe(
          response => {
            console.log(response.json());
          },
          (error: Response) => {
            if(error.status === 404){
              alert('Post does not exist.')
            } else {
              alert('An error occured.');
              console.log(error);
            }
          });
  }
}
