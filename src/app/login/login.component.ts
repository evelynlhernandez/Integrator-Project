import {Component, OnInit} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth-services.component';
import { Router } from '@angular/router';

/**
 * @title Input with error messages
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {

    this.loginForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      }
    );

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');

  }

  onLogin() {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(resp => {
      if (resp.user) {
        localStorage.setItem('user', JSON.stringify( resp.user));
        localStorage.setItem('jwtToken', resp.user.token);
        this.router.navigate(['/private/articles']);
      }
    });
  }
}
