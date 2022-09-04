import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Task Time Tracker';

  usernameField = new FormControl();
  passwordField = new FormControl();
  loginBtn = new FormControl("Login");
  registerBtn = new FormControl("Register");

  loginForm = new FormGroup({
    "username" : this.usernameField,
    "password" : this.passwordField,
    "login" : this.loginBtn,
    "register" : this.registerBtn
  });
}
