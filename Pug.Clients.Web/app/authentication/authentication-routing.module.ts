import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CallbackComponent } from "./callback.component";

const authRoutes: Routes = [
    { path: "auth/callback", component: CallbackComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthenticationRoutingModule { }
