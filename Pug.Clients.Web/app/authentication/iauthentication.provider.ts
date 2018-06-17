import { InjectionToken } from "@angular/core";

import { Observable } from "rxjs";
import { AuthenticationResult } from "./authentication-result";
import { User } from "./user";

export let AUTHENTICATION_PROVIDER = new InjectionToken<IAuthenticationProvider>("authentication.provider");

export interface IAuthenticationProvider {
    displayLogin(): void;
    handleAuthentication(): Observable<AuthenticationResult>;
    renewToken(): Observable<AuthenticationResult>;
    getUserProfile(accessToken: string): Observable<User>;
}
