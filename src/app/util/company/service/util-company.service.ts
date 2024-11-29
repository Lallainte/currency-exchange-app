import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { HelperService } from 'src/app/core/service/helper-service';

@Injectable({
  providedIn: 'root'
})
export class UtilCompanyService {

  constructor(private api: ApiService,
    private helperServ: HelperService) { }

  getAll(pi,body?){
    return this.api.get('companies', this.helperServ.getParam(pi,body));
  }

  getOne(uuid){
    return this.api.get('company/' + uuid);
  }

  save(company){
    return this.api.postFormData('regis-companies', company, true);
  }

  update(company){
    return this.api.putFormData('company/file', company, true);
  }

  delete(uuid){
    this.api.delete('company/' + uuid);
  }
  

  saveBank(companyBank){
    return this.api.post('company-bank', companyBank, true);
  }
  

  extend(companyBank){
    return this.api.put('terminate-companies/extend', companyBank, true);
  }
  

  terminate(companyBank){
    return this.api.put('terminate-companies/dismissed', companyBank, true);
  }
  deleteBank(companyBank){
    let idList =[]
    companyBank.forEach(cb => {
      idList.push(cb.id)
    });
    return this.api.deleteAll('company-bank-delete', idList);
  }
}
