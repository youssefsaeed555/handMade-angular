import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  id = 2;
  token = localStorage.getItem('token');
  ngOnInit(): void {
    console.log(this.token);
    // throw new Error('Method not implemented.');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
