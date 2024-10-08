import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule ,FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {
    // this.signUpImage= _AuthService.authPhoto;
  }
  signupForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })

  emailErrors: string = '';
  passwordErrors: string = '';
  // signUpImage: string = '';

  signup(formData: FormGroup) {
    this._AuthService.singUp(formData.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token)
          this._AuthService.saveCurrentUser()
        }
        this._Router.navigate(['/home'])
      }, error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') this.emailErrors = error.msg;
          if (error.path === 'password') this.passwordErrors = error.msg;
        })
      }
    })
  }
  // ngOnInit(): void { this.phoneImage = this._AuthService.authPhoto };
};
