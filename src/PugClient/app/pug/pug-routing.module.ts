import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LobbyComponent } from "./lobby.component";

const pugRoutes: Routes = [
    { path: 'lobby', component: LobbyComponent }
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
