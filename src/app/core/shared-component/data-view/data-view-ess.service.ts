import { Injectable } from "@angular/core";
import { ApiServiceEss } from "@core/service/api.service-ess";
import { HelperService } from "@core/service/helper-service";

@Injectable({ providedIn: "root" })
export class LinovDataViewEssService {
  constructor(private api: ApiServiceEss, private help: HelperService) {}

  getList(uri, pi, body?) {
    return this.api.get(uri, this.help.getParam(pi, body));
  }
}
