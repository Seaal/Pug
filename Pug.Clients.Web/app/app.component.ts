import { Component } from "@angular/core";
import { LocalizationService } from "./common/localization.service";

@Component({
    moduleId: module.id,
    selector: "pug-client-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    constructor(localizationService: LocalizationService) {
        localizationService.fallbackLanguage = "en-US";
        localizationService.setLanguage("en-US");
    }

}
