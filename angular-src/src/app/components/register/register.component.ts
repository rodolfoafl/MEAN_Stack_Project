import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

const errorMessage = {
  cssClass: "alert alert-danger",
  timeout: 3000
};

const successMessage = {
  cssClass: "alert alert-success",
  timeout: 3000
};

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onRegisterSubmit() {
    const newUser = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    //Required fields
    if (!this.validateService.validateRegister(newUser)) {
      this.flashMessages.show("Please fill in all fields!", errorMessage);
      return false;
    }
    if (!this.validateService.validateEmail(newUser.email)) {
      this.flashMessages.show("Please use a valid email!", errorMessage);
      return false;
    }

    //Register User
    this.authService.registerUser(newUser).subscribe((data: any) => {
      if (data.success) {
        this.flashMessages.show("Registration successful!", successMessage);
        this.router.navigate(["/login"]);
      } else {
        this.flashMessages.show("Registration failed!", errorMessage);
        this.router.navigate(["/register"]);
      }
    });
  }
}
