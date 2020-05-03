import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  loggedin = false;
  faUserCircle = faUserCircle;
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
  }
  constructor() {
  }
  ngOnInit() {
    document.getElementById("test").style.color = "red";
  }
}
