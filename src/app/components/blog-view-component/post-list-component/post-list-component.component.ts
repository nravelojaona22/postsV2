import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { BlogService } from '../../../services/blog-service';
import { Subscription } from 'rxjs';
import { Post } from '../../../models/post.models';

@Component({
  selector: 'app-post-list-component',
  templateUrl: './post-list-component.component.html',
  styleUrls: ['./post-list-component.component.scss']
})
export class PostListComponentComponent implements OnInit, OnDestroy {

  posts : Post[];
  postsSubscription : Subscription;
  
  constructor(private blogService : BlogService) { }

  ngOnInit() {
    this.postsSubscription = this.blogService.postSubject.subscribe(
      (posts : Post[]) => {
        this.posts = posts;
      }
    );
    this.blogService.emitPost();
  }

  ngOnDestroy(){
    this.postsSubscription.unsubscribe();
  }

}
