import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from '../../../../services/blog-service';
import { Post } from '../../../../models/post.models';

@Component({
  selector: 'app-post-list-item-component',
  templateUrl: './post-list-item-component.component.html',
  styleUrls: ['./post-list-item-component.component.scss']
})
export class PostListItemComponentComponent implements OnInit {

  @Input() post : Post;

  constructor(private blogService : BlogService) { }

  onLike(){
    this.blogService.likeIt(this.post);
  }

  onDislike(){
    this.blogService.dislikeIt(this.post);
  }

  ngOnInit() {
  }

  onDelete(post : Post){
    this.blogService.removePost(post);
  }

}
