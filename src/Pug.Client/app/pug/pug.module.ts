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
import { PugPhaseStrategyFactory } from "./phases/pug-phase-strategy.factory";
import { PhaseTitleComponent } from "./phases/phase-title/phase-title.component";
import { TeamComponent } from "./team/team.component";
import { PickUpGameResolver } from "./pick-up-game.resolver";
import { PhaseContainerComponent } from "./phases/phase-container/phase-container.component";
import { PhaseHostDirective } from "./phases/phase-container/phase-host.directive";

@NgModule({
    entryComponents: [PlayerPickerComponent],
    imports: [CommonModule, PugRoutingModule, TranslateModule.forChild()],
    declarations: [LobbyComponent, PickUpGameComponent, PlayerItemComponent, PlayerPickerComponent, PhaseTitleComponent, TeamComponent, PhaseContainerComponent, PhaseHostDirective],
    providers: [PugService, PickUpGameService, PhaseService, PugPhaseStrategyFactory, PickUpGameResolver]
})
export class PugModule { }
