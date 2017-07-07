import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityService, OrganizationService } from 'app/_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Activity, Organization } from "app/_models/index";
import { SharedData } from '../../shared-data';

@Component({
  selector: 'main-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  activities: any = [];
  permissions = [];
  currentPermission: any = {};
  currentActivity: any = {};
  countActivities: number = 0;
  accessToken: any;
  userName: any;
  userId: any;
  count: number = 0;
  loading: false;
  inlineRow: 0;
  orgs: Array<Organization> = new Array;
  orgId: string;
  paging: any = {
    currentPage: 0,
    total: 0,
    perPage: 9
  }
  @ViewChild('orgModal') public orgModal: ModalDirective;

  constructor(private activityService: ActivityService,
    private orgService: OrganizationService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedData: SharedData,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {
    sharedData.changeEmitted$.subscribe(
      text => {
        this.search(text, this.paging.currentPage, this.paging.perPage);
      });

    let data = localStorage.getItem("data");
    let permission = localStorage.getItem("active");


    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        if (val.url.includes("/organizations/")) {
          this.route.params.subscribe(params => {
            this.orgId = params['id'];
            this.paging.total = 0;
            this.fetchActivitiesByOrg(this.orgId, 0, 9);
            this.countActivityOrg(this.orgId);

          });
        } else {
          this.fetchActivities(0, 9);
          this.paging.total = 0;
          this.countActivity();
        }
      }
    });
  }
  search(keyword: string, page: Number, size: Number) {
    if (!this.orgId) {
      this.activityService.searchActivities(keyword, page, size).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {

        })
    }
    else {
      this.activityService.searchActivitiesByOrg(this.orgId, keyword, page, size).subscribe(
        data => {
          this.activities = data.json();
        },
        error => {

        })
    }

  }
  ngOnInit() {
    this.accessToken = this.route.snapshot.queryParams['access_token'];
    this.userName = this.route.snapshot.queryParams['user_name'];
    this.userId = this.route.snapshot.queryParams['user_id'];
    if (this.accessToken) {
      localStorage.setItem('token', this.accessToken);
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('userId', this.userId);
      this.router.navigate(['/']);
    }
    this.router.events
      .subscribe((event) => {
          try{

          }catch(e){
            
          }
      });
  }
  fetchOrg() {
    this.orgService.getAll().subscribe(
      data => {
        this.orgs = data.json();
      },
      error => {
        let dataJs = error.json();
        console.log(dataJs);
      });
  }
  fetchActivities(page: number, size: number) {
    this.countActivity();
    this.activityService.getActivitiesPublicPaging(page, size).subscribe(
      data => {
        this.activities = data.json();
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
    this.activityService.countActivityPublic().subscribe(
      data => {
        this.countActivities = data.json();
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
  }
  fetchActivitiesByOrg(orgId: string, page: number, size: number) {
    this.countActivity();
    this.activityService.getActivitiesPublicOrgPaging(orgId, page, size).subscribe(
      data => {
        this.activities = data.json();
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
    this.activityService.countActivityOrgPublic(orgId).subscribe(
      data => {
        this.countActivities = data.json();
      },
      error => {
        if (error.status == 401) {
          this.router.navigateByUrl("/login");
        }
      });
  }
  countActivity() {
    this.activityService.countActivityPublic().subscribe(
      data => {
        this.paging.total = data.json();
      },
      error => {
        this.handleError(error);
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
  isARow(index: Number) {
    console.log(index);
    if (index === 4)
      return true;
    return false
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

  handleSuccess(data: any) {
    if (data.status === 204) {
      this.addToast("Hoạt động đã được xóa thành công", 2000, "success");
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

