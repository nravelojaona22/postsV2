import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-view.component',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  posts : Post[];

  constructor(private router : Router) { }

  ngOnInit() { 
  }

  onCreatePost(){
    this.router.navigate(['/new']);
  }

}
