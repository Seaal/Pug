import { NgModule } from "@angular/core";
import { AppConfig, APP_CONFIG } from "../app-config";
import { AuthenticationConfig, AUTHENTICATION_CONFIG } from "../authentication/authentication-config";
import { AUTHENTICATION_PROVIDER } from "../authentication/iauthentication.provider";
import { Auth0AuthenticationProvider } from "../authentication/auth0/auth0-authentication.provider";

const appConfig: AppConfig = {
    apiEndpoint: "/api/"
};

const authConfig: AuthenticationConfig = {
    clientId: "9-1XEF_anI8ih2_UJUrP1edekKGhKSEB",
    domain: "seaal-dev.auth0.com",
    responseType: "token id_token",
    audience: "https://pug.gg/api/",
    redirectUri: "http://localhost:3000/auth/callback",
    renewTokenUri: "http://localhost:3000/auth/renewtoken",
    scope: "openid profile test:scope"
};

@NgModule({
    providers: [
        { provide: APP_CONFIG, useValue: appConfig },
        { provide: AUTHENTICATION_CONFIG, useValue: authConfig },
        { provide: AUTHENTICATION_PROVIDER, useClass: Auth0AuthenticationProvider }
    ]
})
export class CoreModule { }
