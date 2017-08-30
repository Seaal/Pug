import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PugModule } from "./pug/pug.module";
import { CommonModule } from "./common/common.module";
import { AppConfig, APP_CONFIG } from "./app-config";
import { AuthenticationModule } from "./authentication/authentication.module";
import { AuthenticationConfig, AUTHENTICATION_CONFIG } from "./authentication/authentication-config";

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appConfig: AppConfig = {
    apiEndpoint: "/api/"
};

const authConfig: AuthenticationConfig = {
    clientId: '9-1XEF_anI8ih2_UJUrP1edekKGhKSEB',
    domain: 'seaal-dev.auth0.com',
    responseType: 'token id_token',
    audience: 'https://pug.gg/api/',
    redirectUri: 'http://localhost:3000/auth/callback',
    renewTokenUri: 'http://localhost:3000/auth/renewtoken',
    scope: 'openid profile test:scope'
};

@NgModule({
    imports: [BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        PugModule,
        AuthenticationModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }
    )],
    providers: [
        { provide: APP_CONFIG, useValue: appConfig },
        { provide: AUTHENTICATION_CONFIG, useValue: authConfig }
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
