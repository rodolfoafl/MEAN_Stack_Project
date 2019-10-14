import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  registerUser(user) {
    return this.http
      .post("users/register", user, httpOptions)
      .pipe(map(res => res));
  }

  authenticateUser(user) {
    return this.http
      .post("users/authenticate", user, httpOptions)
      .pipe(map(res => res));
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    if (localStorage.id_token == undefined) {
      return false;
    } else {
      //console.log(this.jwtHelper.isTokenExpired(localStorage.id_token));
      return !this.jwtHelper.isTokenExpired(localStorage.id_token);
    }
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    this.loadToken();

    let httpProfileOption = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authToken
      })
    };

    return this.http
      .get("users/profile", httpProfileOption)
      .pipe(map(res => res));
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }
}
