import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersService } from '../services/users.service';

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
export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  matcher = new MyErrorStateMatcher();
  constructor(public userService: UsersService) {}

  ngOnInit(): void {}
  //eve.holt@reqres.in
  login() {
    const user = { email: this.emailFormControl.value, password: this.passwordFormControl.value };
    console.log(user);
    this.userService.login(user).subscribe((data) => {
      console.log(data);
    });
  }
}
