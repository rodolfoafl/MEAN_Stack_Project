import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

const errorMessage = {
  cssClass: "alert alert-danger",
  timeout: 3000
};

const successMessage = {
  cssClass: "alert alert-success",
  timeout: 3000
};

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe((data: any) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessages.show("You are now logged in", successMessage);
        this.router.navigate(["/dashboard"]);
      } else {
        this.flashMessages.show(data.msg, errorMessage);
        this.router.navigate(["/login"]);
      }
    });
  }
}
