import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Component({
  selector: 'post-component',
  templateUrl: './post-component.component.html'
})
export class PostComponentComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService){ }

  ngOnInit() {
    this.postService.getPosts()
        .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement){
    let post = {
      title: input.value
    };
    input.value = '';
    this.postService.createPost(post)
        .subscribe(
          newPost => {
            post['id'] = newPost.id;
            this.posts.splice(0, 0, post);
          });
  }

  updatePost(post){
    this.postService.updatePost(post)
        .subscribe(
          updatedPost => {
            console.log(updatedPost);
          },
          (error: AppError) => {
            if(error instanceof NotFoundError){
              alert('Post not found.')
            } else {
              throw error;
            }
          });
  }
}
