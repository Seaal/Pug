import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PugModule } from "./pug/pug.module";
import { CommonModule } from "./common/common.module";
import { AppConfig, APP_CONFIG } from "./app-config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AuthenticationConfig, AUTHENTICATION_CONFIG } from "./authentication/authentication-config";
import { AUTHENTICATION_PROVIDER } from "./authentication/iauthentication.provider";
import { Auth0AuthenticationProvider } from "./authentication/auth0/auth0-authentication.provider";

export function createTranslateLoader(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

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
    imports: [BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        PugModule,
        AuthenticationModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }
    )],
    providers: [
        { provide: APP_CONFIG, useValue: appConfig },
        { provide: AUTHENTICATION_CONFIG, useValue: authConfig },
        { provide: AUTHENTICATION_PROVIDER, useClass: Auth0AuthenticationProvider }
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
