import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/Service/service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,private myService: ServiceService) {}
  id = 2;
  public searchTerm: string = '';
  token = localStorage.getItem('token');
  ngOnInit(): void {
    console.log(this.token);
    // throw new Error('Method not implemented.');
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.myService.search.next(this.searchTerm);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
