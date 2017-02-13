import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PugRoutingModule } from "./pug-routing.module";
import { LobbyComponent } from "./lobby.component";
import { PugService } from "./pug.service";

@NgModule({
    imports: [CommonModule, PugRoutingModule],
    declarations: [LobbyComponent],
    providers: [PugService]
})
export class PugModule { }
