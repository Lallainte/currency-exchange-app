import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private auth: AuthenticationService,
    private router:Router
) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.auth.isLoggedIn()){
        if(environment.isSSO){
          window.location.href = environment.linovWordpress;

        }else{
          this.router.navigate(['/login'])
        }
      }
    return true;
  }
  
}
