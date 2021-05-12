import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import {Store} from '@ngrx/store'
import * as fromRoot from '../app.reducer'
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

    constructor(private store : Store<fromRoot.State>, private router : Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(route: Route) {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}