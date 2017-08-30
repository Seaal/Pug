import { Component, OnInit } from "@angular/core";

import { LocalizationService } from "./common/localization.service";
import { AuthenticationService } from "./authentication/authentication.service";

@Component({
    moduleId: module.id,
    selector: "pug-client-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    public nickname: string = "";

    constructor(localizationService: LocalizationService,
                private authenticationService: AuthenticationService) {
        localizationService.fallbackLanguage = "en-US";
        localizationService.setLanguage("en-US");
    }

    public ngOnInit() {
        this.authenticationService.initAuthentication();

        this.authenticationService.getProfile().subscribe(profile => {
            this.nickname = profile.nickname;
        });

        this.authenticationService.scheduleRenewal();
    }

    public isAuthenticated(): boolean {
        return this.authenticationService.isAuthenticated();
    }

    public login(): void {
        this.authenticationService.login();
    }

    public logout(): void {
        this.authenticationService.logout();
    }

}
