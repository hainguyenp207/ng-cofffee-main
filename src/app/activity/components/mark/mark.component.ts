import { Component, OnInit } from '@angular/core';
import { ActivityService, RegisterService } from '../../../_services/index';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Register, Activity } from '../../../_models/index';
@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {

  id: string;
  sub: any;
  registers: Array<{}>;
  public activity: Activity = new Activity();
  constructor(
    private activityService: ActivityService,
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
  ) {
    this.activity.name = "";
    this.router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.sub = this.route.params.subscribe(params => {
          this.id = params['idActivity'];
          this.fetchRegister(this.id);
          this.fetchActivity(this.id);
        });
      }
    });
  }

  ngOnInit() {
  }
  /**
   * Fetch register
   */
  fetchRegister(idActivity: string) {
    this.registerService.getAll(idActivity).subscribe(
      data => {
        this.registers = data.json();
      },
      error => {
        console.log(error);
        if (error.status == 401) {
        }
      });
  }
  fetchActivity(id: string) {
    this.activityService.getById(id).subscribe(
      data => {
        let dataJs = data.json();
        if (data.status === 200) {
          this.activity.id = dataJs.id;
          this.activity.name = dataJs.name;
          this.activity.description = dataJs.description;
          // this.daterange.pointSocial = dataJs.pointSocial;
          // this.daterange.pointTranning = dataJs.pointTranning;
          // this.picker.datePicker.setStartDate(dataJs.startDate);
          // this.picker.datePicker.setEndDate(dataJs.endDate);
        }
      },
      error => {
        switch (error.status) {
          case 401: {
            this.addToast("Bạn chưa đăng nhập, vui long dang nhap lai", 2000, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/login");
            }, 3000);
          } break;
          case 404: {
            this.addToast("Không tìm thấy hoạt động", 200, "error");
            setTimeout(() => {
              this.router.navigateByUrl("/activities");
            }, 2000);
          }
        }
      });
  }
  onChangeJoined(e, idRegister: string, userId: string, joined: boolean,
    pointSocial: number, pointTranning: number) {
    console.log(e.target.checked);
    this.updateRegister(idRegister, userId, e.target.checked, pointSocial, pointTranning);
  }
  updateRegister(idRegister: string, userId: string, joined: boolean,
    pointSocial: number, pointTranning: number

  ) {
    let reg = new Register();
    reg.id = idRegister;
    reg.joined = joined;
    reg.pointSocial = pointSocial;
    reg.pointTranning = pointTranning;
    reg.activityId = this.id;
    reg.userId = userId;
    this.registerService.update(reg).subscribe(
      data => {
        this.addToast("Cập nhập thành công", 2000, "success");
      },
      error => {
        try {
          let errorJs = error.json();
          if (errorJs.code) {
            this.addToast(errorJs.message, 3000, "error");
          } else {
            this.addToast(error, 3000, "error");
          }
        } catch (e) {
          this.addToast(e, 3000, "error");
        }
      });
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