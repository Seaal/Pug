import { NgModule } from "@angular/core";

import { AuthenticationService } from "./authentication.service";
import { CallbackComponent } from "./callback.component";
import { AuthenticationRoutingModule } from "./authentication-routing.module";

@NgModule({
    providers: [AuthenticationService],
    declarations: [CallbackComponent],
    imports: [AuthenticationRoutingModule]
})
export class AuthenticationModule { }
