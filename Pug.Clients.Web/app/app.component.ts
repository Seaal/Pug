import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    moduleId: module.id,
    selector: "pug-client-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    constructor(translateService: TranslateService) {
        translateService.defaultLang = "en-US";
        translateService.use("en-US");
    }

}
