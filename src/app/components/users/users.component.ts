import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {deserialize, serialize} from "serializer.ts/Serializer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.users.push(deserialize<User>(User, res));
    });
  }

  onSubmit(form: NgForm) {

  }

}
