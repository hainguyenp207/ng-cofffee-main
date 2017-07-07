import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from 'app/_services/index';
@Component({
  selector: 'main-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  ngOnInit() {
  }
  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
       window.location.href = "/"
      },
      error => {
        let detail = error.json();
        if (detail)
          this.alertService.error(detail.message);
        else {
          this.alertService.error(error);
        }
        this.loading = false;
      });
  }
}
