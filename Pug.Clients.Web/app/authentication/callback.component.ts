import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Component({
    template: `Logging you in...`
})
export class CallbackComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) { }

    public ngOnInit(): void {
        this.authenticationService.handleAuthentication();
    }

}
