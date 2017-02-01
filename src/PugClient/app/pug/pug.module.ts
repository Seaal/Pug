import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PugRoutingModule } from "./pug-routing.module";
import { LobbyComponent } from "./lobby.component";

@NgModule({
    imports: [ CommonModule, PugRoutingModule ],
    declarations: [ LobbyComponent ]
})
export class PugModule { }
