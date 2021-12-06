import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLogin } from '../interfaces/user.interface';
import { UsersService } from '../services/users/users.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  matcher = new MyErrorStateMatcher();
  constructor(public userService: UsersService, public router: Router) {}

  ngOnInit(): void {
    this.userService.isAuthenticated() && this.router.navigateByUrl('/home');
  }
  //eve.holt@reqres.in
  login() {
    const user: UserLogin = { email: this.emailFormControl.value, password: this.passwordFormControl.value };
    this.subscription = this.userService.login(user).subscribe((data) => {
      this.userService.setToken(data.token);
      this.router.navigateByUrl('/home');
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
