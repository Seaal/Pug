import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "./authentication/authentication.service";

@Component({
  selector: "pug-client-app",
  templateUrl: "/app/app.component.html"
})
export class AppComponent implements OnInit {

    public nickname: string = "";

    constructor(translateService: TranslateService,
                private authenticationService: AuthenticationService) {
        translateService.defaultLang = "en-US";
        translateService.use("en-US");
    }

    public ngOnInit() {
        this.authenticationService.getProfile().subscribe(profile => {
            this.nickname = profile.nickname;
        });
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
