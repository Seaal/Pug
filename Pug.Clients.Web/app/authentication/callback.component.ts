import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Component({
    template: ``
})
export class CallbackComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService) { }

    public ngOnInit(): void {
        this.authenticationService.handleAuthentication();
    }

}
