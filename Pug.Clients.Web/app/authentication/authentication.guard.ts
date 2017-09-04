import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService) { }

    public canActivate(): boolean {
        return this.authenticationService.isAuthenticated();
    }

}
