import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PugRoutingModule } from "./pug-routing.module";

import { PugService } from "./pug.service";
import { LobbyComponent } from "./lobby.component";
import { PickUpGameComponent } from "./pick-up-game.component";
import { PlayerItemComponent } from "./phases/pick-player/player-item/player-item.component";
import { PickUpGameService } from "./pick-up-game.service";
import { PickPlayerPhaseComponent } from "./phases/pick-player/pick-player-phase.component";
import { PhaseService } from "./phases/phase.service";
import { PugPhaseStrategyFactory } from "./phases/pug-phase-strategy.factory";
import { PhaseTitleComponent } from "./phases/phase-title/phase-title.component";
import { TeamComponent } from "./team/team.component";
import { PickUpGameResolver } from "./pick-up-game.resolver";
import { PhaseContainerComponent } from "./phases/phase-container/phase-container.component";
import { PhaseHostDirective } from "./phases/phase-container/phase-host.directive";
import { LocalizationModule } from "../common/localization/localization.module";
import { InMemoryPickUpGameService } from "./in-memory-pick-up-game.service";

@NgModule({
    entryComponents: [
        PickPlayerPhaseComponent
    ],
    imports: [
        CommonModule,
        PugRoutingModule,
        LocalizationModule
    ],
    declarations: [
        LobbyComponent,
        PickUpGameComponent,
        PlayerItemComponent,
        PickPlayerPhaseComponent,
        PhaseTitleComponent,
        TeamComponent,
        PhaseContainerComponent,
        PhaseHostDirective
    ],
    providers: [
        PugService,
        PhaseService,
        { provide: PickUpGameService, useClass: InMemoryPickUpGameService },
        PugPhaseStrategyFactory,
        PickUpGameResolver
    ]
})
export class PugModule { }
