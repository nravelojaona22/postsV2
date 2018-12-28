import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Post } from '../../models/post.models';
import { BlogService } from '../../services/blog-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm : FormGroup;
  errorMessage : string;
  fileIsUploading : boolean;
  fileURL : string;
  fileUploaded : boolean = false;

  constructor(private formbuilder : FormBuilder,
              private blogService : BlogService,
              private router : Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.postForm = this.formbuilder.group({
      title : ['', Validators.required],
      content : ['', Validators.required]
    });
  }

  onSavePost(){
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const newPost = new Post(title, content);
    newPost.like = 0;
    newPost.dislike = 0;
    const dateNow = Date.now().toString();
    newPost.createDate = dateNow;
    
    if(this.fileURL && this.fileURL !== ''){
      newPost.photo = this.fileURL;
    }

    this.blogService.createPost(newPost).then(
      () => {
        this.blogService.emitPost();
        this.router.navigate(['/posts']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onUploadFile(file : File){
    this.fileIsUploading = true;
    this.blogService.uploadFile(file).then(
      (url : string) => {
        this.fileURL = url;
        console.log(this.fileURL);
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
