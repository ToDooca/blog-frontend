import { Component } from '@angular/core';
import {JwtService} from "../../../common/src/services/jwt.service";

@Component({
  selector: 'app-root',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  title = 'blog';

  constructor(private jwt: JwtService) {
  }

  ngOnInit(): void {
    this.jwt.isLoggedIn();
  }
}


