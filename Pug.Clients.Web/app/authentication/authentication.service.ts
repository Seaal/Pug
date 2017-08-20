import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AuthenticationService {

    private static accessTokenKey: string = "auth_access_token";
    private static idTokenKey: string = "auth_id_token";
    private static expiresAtKey: string = "auth_expires_at";

    private auth0: auth0.WebAuth;
    private userProfile: any;

    constructor(private router: Router) {
        this.auth0 = new auth0.WebAuth({
            clientID: '9-1XEF_anI8ih2_UJUrP1edekKGhKSEB',
            domain: 'seaal-dev.auth0.com',
            responseType: 'token id_token',
            audience: 'https://seaal-dev.auth0.com/userinfo',
            redirectUri: 'http://localhost:3000/auth/callback',
            scope: 'openid profile'
        });
    }

    public login(): void {
        this.auth0.authorize(undefined);
    }

    public logout(): void {
        localStorage.removeItem(AuthenticationService.accessTokenKey);
        localStorage.removeItem(AuthenticationService.idTokenKey);
        localStorage.removeItem(AuthenticationService.expiresAtKey);
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = "";
                this.setSession(authResult);
                this.router.navigate(["pug"]);
            } else if (err) {
                this.router.navigate(["pug"]);
                console.log(err);
            }
        });
    }

    public isAuthenticated(): boolean {
        const expiresAt = JSON.parse(localStorage.getItem(AuthenticationService.expiresAtKey));

        return new Date().getTime() < expiresAt;
    }

    public getProfile(): Observable<any> {
        const accessToken = localStorage.getItem(AuthenticationService.accessTokenKey);

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

    private setSession(authResult: auth0.Auth0DecodedHash): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        localStorage.setItem(AuthenticationService.accessTokenKey, authResult.accessToken);
        localStorage.setItem(AuthenticationService.idTokenKey, authResult.idToken);
        localStorage.setItem(AuthenticationService.expiresAtKey, expiresAt);
    }
}
