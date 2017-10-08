import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import * as auth0 from "auth0-js";

import { PersistentStorageService } from "../common/persistent-storage.service";
import { AuthenticationInfo } from "./authentication-info";
import { IAuthenticationProvider, AUTHENTICATION_PROVIDER } from "./iauthentication.provider";
import { User } from "./user";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class AuthenticationService {

    private static accessTokenKey: string = "auth_access_token";
    private static idTokenKey: string = "auth_id_token";
    private static expiresAtKey: string = "auth_expires_at";
    private static redirectUrlKey: string = "auth_redirect_url";

    private static emptyAuthInfo: AuthenticationInfo = {
        accessToken: undefined,
        idToken: undefined,
        expiresAt: undefined
    };

    public defaultLoginRedirectUrl: string;

    private profileSubject: ReplaySubject<User>;

    private refreshSubscription: Subscription;
    private authInfo: AuthenticationInfo;

    constructor(private router: Router,
                private storageService: PersistentStorageService,
                @Inject(AUTHENTICATION_PROVIDER) private authenticationProvider: IAuthenticationProvider) {
        this.profileSubject = new ReplaySubject<User>(1);

        this.authInfo = AuthenticationService.emptyAuthInfo;
    }

    public initAuthentication(): void {
        const expiresAt = this.storageService.get<number>(AuthenticationService.expiresAtKey);

        if (expiresAt === null) {
            return;
        }

        if (new Date().getTime() >= expiresAt) {
            this.renewToken();
        } else {
            this.authInfo = {
                accessToken: this.storageService.get<string>(AuthenticationService.accessTokenKey),
                idToken: this.storageService.get<string>(AuthenticationService.idTokenKey),
                expiresAt
            };

            this.scheduleRenewal();
            this.setProfile().subscribe();
        }
    }

    public login(): void {
        const currentUrl: string = this.router.url;

        this.storageService.set(AuthenticationService.redirectUrlKey, currentUrl);

        this.authenticationProvider.displayLogin();
    }

    public logout(): void {
        this.unscheduleRenewal();

        this.authInfo = AuthenticationService.emptyAuthInfo;

        this.storageService.remove(AuthenticationService.accessTokenKey);
        this.storageService.remove(AuthenticationService.idTokenKey);
        this.storageService.remove(AuthenticationService.expiresAtKey);

        this.profileSubject.next(null);
    }

    public handleAuthentication(): void {
        this.authenticationProvider.handleAuthentication()
            .flatMap(authResult => this.setSession(authResult))
            .subscribe(authResult => {
                const redirectUrl: string = this.storageService.get<string>(AuthenticationService.redirectUrlKey);

                this.storageService.remove(AuthenticationService.redirectUrlKey);

                if (redirectUrl) {
                    this.router.navigateByUrl(redirectUrl);
                } else {
                    this.router.navigateByUrl(this.defaultLoginRedirectUrl || "");
                }
            },
            error => {
                this.router.navigateByUrl(this.defaultLoginRedirectUrl || "");
            }
        );
    }

    public isAuthenticated(): boolean {
        return !!this.authInfo.expiresAt && new Date().getTime() < this.authInfo.expiresAt;
    }

    public getAccessToken(): string {
        return this.authInfo.accessToken;
    }

    public get profile(): Observable<User> {
        return this.profileSubject.asObservable();
    }

    private unscheduleRenewal(): void {
        if (!this.refreshSubscription) {
            return;
        }

        this.refreshSubscription.unsubscribe();
        this.refreshSubscription = null;
    }

    private scheduleRenewal(): void {

        this.unscheduleRenewal();

        const source = Observable.of(this.authInfo.expiresAt).flatMap(
            expires => {
                const now = Date.now();

                return Observable.timer(Math.max(1, expires - now));
            }
        );

        this.refreshSubscription = source.subscribe(() => this.renewToken());
    }

    private renewToken(): void {
        this.authenticationProvider.renewToken()
            .flatMap(authResult => this.setSession(authResult))
            .subscribe(
                undefined,
                error => console.log(error)
        );
    }

    private setSession(authResult: auth0.Auth0DecodedHash): Observable<void> {

        const expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();

        this.authInfo = {
            accessToken: authResult.accessToken,
            idToken: authResult.idToken,
            expiresAt
        };

        this.storageService.set(AuthenticationService.accessTokenKey, authResult.accessToken);
        this.storageService.set(AuthenticationService.idTokenKey, authResult.idToken);
        this.storageService.set(AuthenticationService.expiresAtKey, expiresAt);

        this.scheduleRenewal();

        return this.setProfile()
                   .map(() => { return; });
    }

    private setProfile(): Observable<any> {
        const accessToken = this.authInfo.accessToken;

        return this.authenticationProvider.getUserProfile(accessToken)
            .do(user => this.profileSubject.next(user));
    }
}
