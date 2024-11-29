import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { HelperService } from 'src/app/core/service/helper-service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private api: ApiService,
    private helperServ: HelperService) { }

  getAll(pi,body?){
    return this.api.get('roles', this.helperServ.getParam(pi,body));
  }
  getDashboard(id){
    return this.api.get('role/premium/widget/'+id);
  }
  getReport(id){
    return this.api.get('role/premium/report/'+id);
  }
  update(body){
    return this.api.put('role',body,true);
  }

}
