import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationService {

    private static accessTokenKey: string = "auth_access_token";
    private static idTokenKey: string = "auth_id_token";
    private static expiresAtKey: string = "auth_expires_at";

    private auth0: auth0.WebAuth;

    constructor(private router: Router) {
        this.auth0 = new auth0.WebAuth({
            clientID: '9-1XEF_anI8ih2_UJUrP1edekKGhKSEB',
            domain: 'seaal-dev.auth0.com',
            responseType: 'token id_token',
            audience: 'https://seaal-dev.auth0.com/userinfo',
            redirectUri: 'http://localhost:3000/auth/callback',
            scope: 'openid'
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

    private setSession(authResult: auth0.Auth0DecodedHash): void {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

        localStorage.setItem(AuthenticationService.accessTokenKey, authResult.accessToken);
        localStorage.setItem(AuthenticationService.idTokenKey, authResult.idToken);
        localStorage.setItem(AuthenticationService.expiresAtKey, expiresAt);
    }
}
