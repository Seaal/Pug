import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import * as auth0 from "auth0-js";

import { PersistentStorageService } from "../common/persistent-storage.service";
import { AuthenticationInfo } from "./authentication-info";
import { AuthenticationConfig, AUTHENTICATION_CONFIG } from "./authentication-config";

@Injectable()
export class AuthenticationService {

    private static accessTokenKey: string = "auth_access_token";
    private static idTokenKey: string = "auth_id_token";
    private static expiresAtKey: string = "auth_expires_at";
    private static redirectUrlKey: string = "auth_redirect_url";

    private auth0: auth0.WebAuth;

    private userProfile: any;

    private refreshSubscription: Subscription;
    private authInfo: AuthenticationInfo;

    constructor(private router: Router,
                private storageService: PersistentStorageService,
                @Inject(AUTHENTICATION_CONFIG) private authConfig: AuthenticationConfig) {
        this.auth0 = new auth0.WebAuth({
            clientID: authConfig.clientId,
            domain: authConfig.domain,
            responseType: authConfig.responseType,
            audience: authConfig.audience,
            redirectUri: authConfig.redirectUri,
            scope: authConfig.scope
        });
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
        }
    }

    public login(): void {
        const currentUrl: string = this.router.url;

        this.storageService.set(AuthenticationService.redirectUrlKey, currentUrl);

        this.auth0.authorize(undefined);
    }

    public logout(): void {
        this.authInfo = null;

        this.storageService.remove(AuthenticationService.accessTokenKey);
        this.storageService.remove(AuthenticationService.idTokenKey);
        this.storageService.remove(AuthenticationService.expiresAtKey);

        this.unscheduleRenewal();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = "";
                this.setSession(authResult);

                const redirectUrl: string = this.storageService.get<string>(AuthenticationService.redirectUrlKey);

                this.storageService.remove(AuthenticationService.redirectUrlKey);

                if (redirectUrl) {
                    this.router.navigateByUrl(redirectUrl);
                } else {
                    this.router.navigateByUrl(this.authConfig.defaultLoginRedirectUrl);
                }

            } else if (err) {
                this.router.navigate(["pug"]);
                console.log(err);
            }
        });
    }

    public isAuthenticated(): boolean {
        return new Date().getTime() < this.authInfo.expiresAt;
    }

    public getProfile(): Observable<any> {
        const accessToken = this.authInfo.accessToken;

        if (!this.isAuthenticated()) {
            return Observable.empty();
        }

        const profileSubject = new Subject<any>();

        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
                profileSubject.next(profile);
                profileSubject.complete();
                console.log(profile);
            }

            if (err) {
                profileSubject.error(err);
                profileSubject.complete();
            }
        });

        return profileSubject.asObservable();
    }

    public renewToken(): void {
        this.auth0.renewAuth({
            audience: this.authConfig.audience,
            redirectUri: this.authConfig.renewTokenUri,
            usePostMessage: true
        }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                this.setSession(result);
            }
        });
    }

    public scheduleRenewal(): void {
        if (!this.isAuthenticated()) {
            return;
        }

        this.unscheduleRenewal();

        const source = Observable.of(this.authInfo.expiresAt).flatMap(
            expires => {
                const now = Date.now();

                return Observable.timer(Math.max(1, expires - now));
            }
        );

        this.refreshSubscription = source
            .subscribe(() => {
                this.renewToken();
                this.scheduleRenewal();
            });
    }

    public unscheduleRenewal(): void {
        if (!this.refreshSubscription) {
            return;
        }

        this.refreshSubscription.unsubscribe();
        this.refreshSubscription = null;
    }

    public getAccessToken(): string {
        return this.authInfo.accessToken;
    }

    private setSession(authResult: auth0.Auth0DecodedHash): void {

        this.authInfo = {
            accessToken: authResult.accessToken,
            idToken: authResult.idToken,
            expiresAt: null
        };

        this.storageService.set(AuthenticationService.accessTokenKey, authResult.accessToken);
        this.storageService.set(AuthenticationService.idTokenKey, authResult.idToken);

        this.updateExpiry(authResult.expiresIn);

        this.scheduleRenewal();
    }

    private updateExpiry(expiresIn: number) {
        const expiresAt = (expiresIn * 1000) + new Date().getTime();

        this.storageService.set(AuthenticationService.expiresAtKey, expiresAt);
        this.authInfo.expiresAt = expiresAt;
    }
}
