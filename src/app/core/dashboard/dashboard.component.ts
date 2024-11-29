import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { AppConstant } from '@core/config/app.config';
import { lastValueFrom } from 'rxjs';
import { PageInfo } from '@core/model/page-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  web = localStorage.getItem('web');
  first = 0;
  page = 1;
  limit = 3;
  listData: any[] = [];
  body: any;
  rowsPerPage = AppConstant.rowsCard;
  rowsPerPageOptions = AppConstant.rowsCardOptions;
  count: number = 0;
  imgData: any[] = [];

  constructor(private service: DashboardService, private route: Router) { }


  ngOnInit() {
    this.getList(new PageInfo(this.page, this.limit));
  }

  getList(pi) {
    lastValueFrom(this.service.getAll('announcements/display', pi, this.body)).then((res) => {
      if (res) {
        if (this.listData.length) {
          for (let i of res.data) {
            this.listData.push(i);
          }
        } else {
          this.listData = res.data;
          this.count = res.paging.totalItem;
        }
      }
    }).catch(err => { });
  }

  onScroll(): void {
    this.getList(new PageInfo(++this.page, this.limit));
  }

  getImageUrl(item): string {
    // const foundItem = this.imgData.find(
    //   (imgItem) => imgItem.id === item.id
    // );
    if (item.bannerFile) {
      try {
        const imageUrl = this.base64toUrl(
          item.bannerFile.file.base
        );
        return imageUrl;
      } catch (error) {
        return 'assets/images/no-image-announcement.png';
      }
    } else {
      return 'assets/images/no-image-announcement.png';
    }
  }

  base64toUrl(base64String: string): string {
    return 'data:image/*;base64,' + base64String;
  }

  onClickRow(id: string) {
    this.route.navigateByUrl(
      `${this.web}/notifications/detail/${id}/announcement`
    );
  }

  onClickView(){
    this.route.navigateByUrl(
      `${this.web}/notifications/list/announcements`
    );
  }
}
