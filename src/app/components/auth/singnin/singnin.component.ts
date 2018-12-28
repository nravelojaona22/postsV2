import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-singnin',
  templateUrl: './singnin.component.html',
  styleUrls: ['./singnin.component.scss']
})
export class SingninComponent implements OnInit {

  signinForm : FormGroup;
  errorMessage : string;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.signinForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/posts']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
