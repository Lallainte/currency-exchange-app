import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { HelperService } from 'src/app/core/service/helper-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private api: ApiService,
    private helperServ: HelperService) { }

  getAll(pi,body?){
    return this.api.get('users', this.helperServ.getParam(pi,body));
  }
  getOne(id){
    return this.api.get('user/'+id);
  }

  deact(body){
    return this.api.post('user/deactivate', body,true);
  }

  act(body){
    return this.api.post('user/activate', body,true);
  }
  save(body){
    return this.api.post('user', body, true);
  }
  update(body){
    return this.api.put('user', body, true);
  }
  resetPass(body){
    return this.api.put('user/reset-password',body,true);
  }
  changePass(body){
    return this.api.put('user/change-password',body,true);
  }

}
