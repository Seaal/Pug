import { NgModule } from "@angular/core";

import { PugRoutingModule } from "./pug-routing.module";
import { LobbyComponent } from "./lobby.component";

@NgModule({
    imports: [PugRoutingModule],
    declarations: [LobbyComponent]
})
export class PugModule { }
