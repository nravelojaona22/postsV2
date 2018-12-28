import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponentComponent } from './components/blog-view-component/post-list-component/post-list-component.component';
import { PostListItemComponentComponent } from './components/blog-view-component/post-list-component/post-list-item-component/post-list-item-component.component';
import { BlogService } from './services/blog-service';
import { BlogViewComponent } from './components/blog-view-component/blog-view.component';
import { AuthService } from './services/auth.service';
import { SingninComponent } from './components/auth/singnin/singnin.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewPostComponent } from './components/new-post/new-post.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponentComponent,
    PostListItemComponentComponent,
    BlogViewComponent,
    HeaderComponent,
    SingninComponent,
    SingupComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BlogService, 
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
