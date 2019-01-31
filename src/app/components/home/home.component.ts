import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {deserialize} from "serializer.ts/Serializer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getMyProfile().subscribe(res => {
      this.user = deserialize<User>(User, res);
    });
    console.log(this.user);
  }

}
