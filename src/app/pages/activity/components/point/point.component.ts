import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService, RegisterService } from 'app/_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})

export class PointComponent implements OnInit {

  activities: any = [];
  permissions = [];
  currentPermission: any = {};
  currentActivity: any = {};
  countActivities: number = 0;
  count: number = 0;
  loading: false;
  paging: any = {
    currentPage: 0,
    total: 0,
    perPage: 10
  };
  dataRegister: any = {};


  @ViewChild('orgModal') public orgModal: ModalDirective;

  constructor(private activityService: ActivityService,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
    let data = localStorage.getItem("data");
    let permission = localStorage.getItem("active");
    if (data) {
      let dataJs = JSON.parse(data);
      let permissionJs = JSON.parse(permission);
      this.permissions = dataJs.permissions;
      this.currentPermission = permissionJs;
      this.fetchActivities(0, 10);
    } else {
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {

  }
  fetchActivities(page: number, size: number) {
    this.countActivityOrg(this.currentPermission.organization.id);
    this.activityService.getActivityPoint(this.currentPermission.organization.id, page, size).subscribe(
      data => {
        this.activities = data.json();
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
    this.activityService.countActivityOrgConfirm(this.currentPermission.organization.id).subscribe(
      data => {
        this.countActivities = data.json();
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
  }
  countActivityOrg(orgId: string) {
    this.activityService.countActivityOrgPublic(orgId).subscribe(
      data => {
        this.paging.total = data.json();
      },
      error => {
        this.handleError(error);
      });
  }
  handleError(error: any) {
    switch (error.status) {
      case 401: this.router.navigateByUrl("/login");
      case 403: this.router.navigateByUrl("/error/403");
      case 404: this.router.navigateByUrl("/error/404");
      case 400: {
        let errorSV = error.json();
        errorSV.detail.forEach(element => {
          this.addToast(element.message, 5000, "error");
        });
      };
      default: {
        try {
          let js = error.json();
          if (js.code) {
            this.addToast(js.message, 3000, "error");
          }
        } catch (e) {
          this.addToast(e, 3000, "error");
        }
      }
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
  getPage(page: number) {
    this.paging.currentPage = page - 1;
    this.fetchActivities(page - 1, this.paging.perPage)
  }
  setItemPerPage(e) {
    console.log(e);
  }
  onPageChange(page: any, perItemOnPage: any) {
    this.paging.currentPage = page;
    this.fetchActivities(page, perItemOnPage)
  }
  isEmpty() {
    if (this.activities.length == 0)
      return true;
    return false;
  }
  public showModal(): void {
    this.orgModal.show();
  }

  public showModalEdit(activity: any): void {
    this.currentActivity = activity;
    this.orgModal.show();
  }

  public hideModal(): void {
    this.orgModal.hide();
  }
  register() {
    this.dataRegister.activityId = this.currentActivity.id;
    this.dataRegister.createdDate = new Date().toDateString();
    this.dataRegister.joined = true;
    this.dataRegister.pointSocial = this.currentActivity.pointSocial;
    this.dataRegister.pointTranning = this.currentActivity.pointTranning;

    this.registerService.create(this.dataRegister).subscribe(
      data => {
        let dataJs = data.json();
        this.addToast("Bạn đã đăng ký hoạt động này", 2000, "success");
      },
      error => {
        let json = error.json();
        console.log(json);
        switch (error.status) {
          case 401: {
            this.addToast(json.message, 2000, "error");
          } break;
          case 404: {
            this.addToast(json.message, 2000, "error");
          }; break;
          case 409: {
            console.log(json);
            this.addToast(json.message, 2000, "error");
          } break;
          default: this.addToast("Co loi", 2000, "error");
        }
      });


  }
}
