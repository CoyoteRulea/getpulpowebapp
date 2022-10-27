import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/pages/users/interfaces/users.interface';
import { GlobalLoggedUser } from '../../service/logged-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username !: string;

  constructor(private globalLoggedUser: GlobalLoggedUser) {
    this.username =  globalLoggedUser.getUserName();
   }

  ngOnInit(): void {
  }

}
