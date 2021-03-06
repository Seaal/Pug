import { Component, OnInit } from "@angular/core";

import { LocalizationService } from "./common/localization/localization.service";
import { AuthenticationService } from "./authentication/authentication.service";

@Component({
    moduleId: module.id,
    selector: "pug-client-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    public nickname: string = "";

    constructor(private localizationService: LocalizationService,
                public authenticationService: AuthenticationService) { }

    public ngOnInit() {
        this.authenticationService.initAuthentication();

        this.authenticationService.profile.subscribe(profile => {
            this.nickname = profile ? profile.nickname : "";
        });

        this.localizationService.fallbackLanguage = "en-US";
        this.localizationService.setLanguage("en-US");
    }

    public isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }
}
