import { Component, OnInit } from '@angular/core';

import { Activity, Register } from 'app/_models/index';
import { ActivityService, OrganizationService, RegisterService } from 'app/_services/index';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { LoadingAnimateService } from 'ng2-loading-animate';
import * as moment from 'moment';
import { FacebookService, InitParams, FBCommentsComponent, FBCommentEmbedComponent } from 'ngx-facebook';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  active: any = {};
  typeComponent: any = {};
  authentication: any
  organizations: any = [];
  data: any = {};
  id: string;
  token: string;
  isRegistered: boolean;
  idUser: string;
  private sub: any;
  dataRegister: Register = new Register;
  registered: any = {};
  loadingSubmit: boolean = false;

  constructor(private activityService: ActivityService,
    private organizationService: OrganizationService,
    private registerService: RegisterService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private route: ActivatedRoute,
    private router: Router,
    private _loadingSvc: LoadingAnimateService,
    private fb: FacebookService
  ) {
    let initParams: InitParams = {
      appId: '1378033548944571',
      xfbml: true,
      version: 'v2.9'
    };
    fb.init(initParams);
    this.toastyConfig.theme = 'material';

      this.router.events.subscribe((val) => {
        // see also 
        if (val instanceof NavigationEnd) {
          this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.fetchActivity(this.id);
            try {
      let data = JSON.parse(localStorage.getItem("data"));
      this.idUser = data.username;
      this.token = localStorage.getItem("token");
    if (this.idUser)
              this.checkUserRegisteredActivity(this.id, this.idUser);
    } catch (e) {

    }
            
          });
        }
      });

    

  }

  ngOnInit() {
    this.data = {}
  }
  fetchActivity(id: string) {
    this.activityService.getById(id).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.data = dataJs;
          document.title = this.data.name + " - HCMUTE";
        }
      },
      error => {
        switch (error.status) {
          case 401: {

          } break;
          case 404: {
            this.router.navigateByUrl("/")
          }
        }
      });
  }
  fetchRegistered(idActivity: string, idUser: string) {
    this.registerService.getRegisterOfUser(idUser, idActivity).subscribe(
      data => {
        let json = data.json();
        if (data.status === 200) {
          this.registered = json;
        }
      },
      error => {
        switch (error.status) {
          case 401: {
          } break;
          case 404: {
          }
        }
      });
  }
  checkUserRegisteredActivity(idActivity: string, idUser: string) {
    this.registerService.checkRegisteredActivity(idActivity, idUser).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.isRegistered = dataJs;
          if (dataJs) {
            this.fetchRegistered(idActivity, idUser);
          }
        }
      },
      error => {
        switch (error.status) {
          case 401: {
          } break;
          case 404: {
          }
        }
      });
  }
  isLogged() {
    if (this.token && this.idUser)
      return true;
    return false;
  }
  isCanRegister() {
    return this.data.canRegister
  }
  register(id: any) {
    this.dataRegister.activityId = id;
    this.dataRegister.userId = this.idUser;
    this.dataRegister.createdDate = new Date().toDateString();
    this.dataRegister.joined = true;
    this.dataRegister.pointSocial = 0;
    this.dataRegister.pointTranning = 0;
    if (!this.isRegistered) {
      this.registerService.create(this.dataRegister).subscribe(
        data => {
          let dataJs = data.json();
          this.addToast("Bạn đã đăng ký hoạt động này", 2000, "success");
          this.checkUserRegisteredActivity(this.id, this.idUser);
        },
        error => {
          let json = error.json();
          switch (error.status) {
            case 401: {
              this.addToast(json.message, 2000, "error");
            } break;
            case 404: {
              this.addToast(json.message, 2000, "error");
            }; break;
            case 409: {
              this.addToast(json.message, 2000, "error");
            } break;
            default: this.addToast("Co loi", 2000, "error");
          }
        });
    } else {
      this.registered.joined = false;
      this.registerService.delete(this.registered.id).subscribe(
        data => {
          let dataJs = data.json();
          this.addToast("Bạn đã hủy đăng ký hoạt động này", 2000, "success");
          this.checkUserRegisteredActivity(this.id, this.idUser);
        },
        error => {
          let json = error.json();
          switch (error.status) {
            case 401: {
              this.addToast(json.message, 2000, "error");
            } break;
            case 404: {
              this.addToast(json.message, 2000, "error");
            }; break;
            case 409: {
              this.addToast(json.message, 2000, "error");
            } break;
            default: this.addToast("Co loi", 2000, "error");
          }
        });
    }

  }
  addToast(message, timeOut, type) {
    // Or create the instance of ToastOptions
    var toastOptions: ToastOptions = {
      title: "Thông báo",
      msg: message,
      showClose: true,
      timeout: timeOut,
      theme: 'material'
    };
    // Add see all possible types in one shot
    switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }
}
