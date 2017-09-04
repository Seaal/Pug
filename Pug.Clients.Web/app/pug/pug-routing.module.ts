import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LobbyComponent } from "./lobby.component";
import { PickUpGameComponent } from "./pick-up-game.component";
import { PickUpGameResolver } from "./pick-up-game.resolver";
import { AuthenticationGuard } from "../authentication/authentication.guard";

const pugRoutes: Routes = [
    { path: "lobby", component: LobbyComponent },
    { path: "pug", component: PickUpGameComponent, resolve: { pug: PickUpGameResolver }, canActivate: [AuthenticationGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(pugRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PugRoutingModule { }
