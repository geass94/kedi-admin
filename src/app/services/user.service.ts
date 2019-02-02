import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getMyProfile() {
    return this.http.get(`${environment.apiUrl}/user/me`);
  }

  updateUser(userId: number, user: User) {
    return this.http.put(`${environment.apiUrl}/user/${userId}`, user);
  }

  getUsers() {
    return this.http.get(`${environment.apiUrl}/user/get-all-users`);
  }
}
