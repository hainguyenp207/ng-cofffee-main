import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService } from '../_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Activity } from "../_models/index";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
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
  }
  @ViewChild('orgModal') public orgModal: ModalDirective;

  constructor(private activityService: ActivityService,
    private route: ActivatedRoute,
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
    }
    this.fetchActivities(0, 10);
    this.countActivity();
  }

  ngOnInit() {

  }
  fetchActivities(page: number, size: number) {
    if (this.isFullPermission()) {
      this.activityService.getActivitiesPaging(page, size).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
      this.activityService.countActivityConfirm().subscribe(
        data => {
          this.countActivities = data.json();
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
    } else {
      this.activityService.getActivityByOrg(this.currentPermission.organizationId).subscribe(
        data => {
          this.activities = data;
        },
        error => {
          if (error.status == 401) {
            this.router.navigateByUrl("/login");
          }
        });
    }
  }
  countActivity() {
    this.activityService.countActivity().subscribe(
      data => {
        this.paging.total = data.json();
        console.log(this.paging.total);
      },
      error => {
        this.handleError(error);
      });
  }
  isFullPermission() {
    if (this.currentPermission.roleId === 'ADMIN'
      && this.currentPermission.organizationId === 'HCMUTE') {
      return true;
    } else
      return false;
  }
  confirm(activity: any, confirm: boolean) {
    activity.confirmed = confirm;
    this.activityService.update(activity).subscribe(
      data => {
        this.handleSuccess(data);
      },
      error => {
        this.handleError(error);
      });
  }
  public showModal(activity: Activity): void {
    this.currentActivity = activity;
    this.orgModal.show();
  }
  public hideModal(): void {
    this.orgModal.hide();
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
  delete(idActivity: string) {
    this.activityService.delete(idActivity).subscribe(
      data => {
        this.handleSuccess(data);
      },
      error => {
        this.handleError(error);
      });
    this.hideModal();

  }
  handleSuccess(data: any) {
    if (data.status === 204) {
      this.addToast("Hoat dong da duoc xoa thanh cong", 2000, "success");
    } else {
      var json = data.json();
      if (json.code == 0) {
        this.addToast(json.message, 2000, "success");
      }
    }
    this.fetchActivities(this.paging.currentPage, this.paging.perPage);
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
  getPage(page: number) {
    this.paging.currentPage = page - 1;
    this.fetchActivities(page - 1, this.paging.perPage)
  }

}
