import { NgModule } from "@angular/core";

import { AuthenticationService } from "./authentication.service";
import { CallbackComponent } from "./callback.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationGuard } from "./authentication.guard";

@NgModule({
    providers: [
        AuthenticationService,
        AuthenticationGuard
    ],
    declarations: [CallbackComponent],
    imports: [AuthenticationRoutingModule]
})
export class AuthenticationModule { }
