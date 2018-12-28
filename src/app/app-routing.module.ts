import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogViewComponent } from './components/blog-view-component/blog-view.component';
import { SingupComponent } from './components/auth/singup/singup.component';
import { SingninComponent } from './components/auth/singnin/singnin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NewPostComponent } from './components/new-post/new-post.component';

const routes: Routes = [
  {path : 'auth/signup', component : SingupComponent},
  {path : 'auth/signin', component : SingninComponent},
  {path : 'posts', canActivate : [AuthGuardService], component: BlogViewComponent},
  {path : 'new', canActivate : [AuthGuardService], component: NewPostComponent},
  {path : '', redirectTo: 'posts', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
