import { Injectable, Inject } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import * as auth0 from "auth0-js";

import { AuthenticationConfig, AUTHENTICATION_CONFIG } from "../authentication-config";
import { AuthenticationResult } from "../authentication-result";
import { IAuthenticationProvider } from "../iauthentication.provider";
import { User } from "../user";

@Injectable()
export class Auth0AuthenticationProvider implements IAuthenticationProvider {

    private auth0: auth0.WebAuth;

    constructor(@Inject(AUTHENTICATION_CONFIG) private authConfig: AuthenticationConfig) {
        this.auth0 = new auth0.WebAuth({
            clientID: authConfig.clientId,
            domain: authConfig.domain,
            responseType: authConfig.responseType,
            audience: authConfig.audience,
            redirectUri: authConfig.redirectUri,
            scope: authConfig.scope
        });
    }

    public displayLogin(): void {
        this.auth0.authorize(undefined);
    }

    public handleAuthentication(): Observable<AuthenticationResult> {
        const authResultSubject = new Subject<AuthenticationResult>();

        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken && authResult.expiresIn) {
                window.location.hash = "";

                authResultSubject.next({
                    accessToken: authResult.accessToken,
                    idToken: authResult.idToken,
                    expiresIn: authResult.expiresIn
                });
            } else {
                authResultSubject.error(err);
            }

            authResultSubject.complete();
        });

        return authResultSubject.asObservable();
    }

    public renewToken(): Observable<AuthenticationResult> {
        const authResultSubject = new Subject<AuthenticationResult>();

        this.auth0.renewAuth({
                audience: this.authConfig.audience,
                redirectUri: this.authConfig.renewTokenUri,
                usePostMessage: true
            },
            (err, authResult) => {
                if (err) {
                    authResultSubject.error(err);
                } else {
                    authResultSubject.next({
                        accessToken: authResult.accessToken,
                        idToken: authResult.idToken,
                        expiresIn: authResult.expiresIn
                    });
                }

                authResultSubject.complete();
            }
        );

        return authResultSubject.asObservable();
    }

    public getUserProfile(accessToken: string): Observable<User> {
        const profileSubject = new Subject<User>();

        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                profileSubject.next({
                    userId: profile.sub,
                    nickname: profile.nickname
                });
            } else if (err) {
                profileSubject.error(err);
            }

            profileSubject.complete();
        });

        return profileSubject.asObservable();
    }

}
