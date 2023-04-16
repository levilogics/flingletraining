import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountService} from "./_services/account.service";
import {User} from "./_models/user";
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flingle';
  users: any;

  constructor(private accountService: AccountService, private http: HttpClient) {
    setTheme('bs5'); // or 'bs4'
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}
