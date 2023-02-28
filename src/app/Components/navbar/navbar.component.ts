import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor() {}
  id = 2;
  token = localStorage.getItem('token');
  ngOnInit(): void {
    console.log(this.token);
    // throw new Error('Method not implemented.');
  }
}
