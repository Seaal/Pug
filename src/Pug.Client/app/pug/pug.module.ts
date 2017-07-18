import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PugRoutingModule } from "./pug-routing.module";
import { PugService } from "./pug.service";

import { LobbyComponent } from "./lobby.component";
import { PickUpGameComponent } from "./pick-up-game.component";
import { PlayerItemComponent } from "./players/player-item/player-item.component";
import { PickUpGameService } from "./pick-up-game.service";
import { PlayerPickerComponent } from "./players/player-picker/player-picker.component";

@NgModule({
    imports: [CommonModule, PugRoutingModule],
    declarations: [LobbyComponent, PickUpGameComponent, PlayerItemComponent, PlayerPickerComponent],
    providers: [PugService, PickUpGameService]
})
export class PugModule { }
