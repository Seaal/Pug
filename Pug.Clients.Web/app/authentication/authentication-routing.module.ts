import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./callback.component";

const pugRoutes: Routes = [
    { path: "auth/callback", component: CallbackComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(pugRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthenticationRoutingModule { }
