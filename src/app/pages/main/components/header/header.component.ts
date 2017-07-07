import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Activity, Organization } from "app/_models/index";
import { ActivityService, OrganizationService } from 'app/_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();
  private url: any = 'http://localhost:9002/#/login';
  private returnUrl: any = 'http://localhost:9000'
  private accessToken: any = '';
  private userName: any = '';
  private orgs: Array<Organization> = new Array;
  constructor(
    private orgService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.fetchOrg();
    this.router.events.subscribe((val) => {
      try {
        let data = JSON.parse(localStorage.getItem("data"));
        if(data)
        this.userName = data.name;
      } catch (e) {
        console.log(e);
      }
    });
  }

  ngOnInit() {
    this.accessToken = localStorage.getItem('token');
    try {
      let data = JSON.parse(localStorage.getItem("data"));
      this.userName = data.name;
    } catch (e) {
    }
  }
  fetchOrg() {
    this.orgService.getAll().subscribe(
      data => {
        this.orgs = data.json();
      },
      error => {
        let dataJs = error.json();
      });
  }
  getLinkLogin() {
    return ['/login']
  }
  onSearchChange(e: any) {
    setTimeout(() => {
      this.notify.emit(e);
    }, 500)
  }
}
