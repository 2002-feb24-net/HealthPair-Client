import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../_services'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  loggedin = false;
  faUserCircle = faUserCircle;
  currentPatient: any;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  login() {
    this.router.navigate(['/login']);
    if(this.currentPatient){this.loggedin = true;}
  }
  logout() {
    this.loggedin = false;
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.CurrentPatient.subscribe(x => this.currentPatient = x);
  }
  ngOnInit() {
    if(!this.currentPatient){this.login();}
  }
}
