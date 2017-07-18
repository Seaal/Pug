import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateModule } from "@ngx-translate/core";

import { PugRoutingModule } from "./pug-routing.module";

import { PugService } from "./pug.service";
import { LobbyComponent } from "./lobby.component";
import { PickUpGameComponent } from "./pick-up-game.component";
import { PlayerItemComponent } from "./players/player-item/player-item.component";
import { PickUpGameService } from "./pick-up-game.service";
import { PlayerPickerComponent } from "./players/player-picker/player-picker.component";
import { PhaseService } from "./phases/phase.service";
import { PugPhaseFactory } from "./phases/pug-phase.factory";

@NgModule({
    imports: [CommonModule, PugRoutingModule, TranslateModule.forChild()],
    declarations: [LobbyComponent, PickUpGameComponent, PlayerItemComponent, PlayerPickerComponent],
    providers: [PugService, PickUpGameService, PhaseService, PugPhaseFactory]
})
export class PugModule { }
