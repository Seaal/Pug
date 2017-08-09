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

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appConfig: AppConfig = {
    apiEndpoint: "/api/"
};

@NgModule({
    imports: [BrowserModule,
        CommonModule,
        HttpClientModule,
        AppRoutingModule,
        PugModule,
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
        { provide: APP_CONFIG, useValue: appConfig }
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }