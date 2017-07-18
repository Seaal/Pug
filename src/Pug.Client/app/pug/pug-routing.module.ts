import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LobbyComponent } from "./lobby.component";
import { PickUpGameComponent } from "./pick-up-game.component";

const pugRoutes: Routes = [
    { path: "lobby", component: LobbyComponent },
    { path: "pug", component: PickUpGameComponent }
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
