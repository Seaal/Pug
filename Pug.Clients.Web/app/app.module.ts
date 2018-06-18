import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { PugModule } from "./pug/pug.module";
import { CommonModule } from "./common/common.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { CoreModule } from "./core/core.module";

export function createTranslateLoader(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
    imports: [
        //Angular Modules
        BrowserModule,
        HttpClientModule,

        //Third Party Modules
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),

        //App Modules
        CommonModule,
        CoreModule,
        AppRoutingModule,
        PugModule,
        AuthenticationModule
    ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
