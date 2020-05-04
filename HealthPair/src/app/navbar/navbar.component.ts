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
    document.getElementById("test").style.color = "green";
    this.loggedin = true;
  }
  logout() {
    document.getElementById("test").style.color = "red";
    this.loggedin = false;
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.CurrentPatient.subscribe(x => this.currentPatient = x);
  }
  ngOnInit() {
    document.getElementById("test").style.color = "red";
  }
}
