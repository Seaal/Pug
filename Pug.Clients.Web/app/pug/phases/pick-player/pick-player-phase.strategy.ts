﻿import { Type } from "@angular/core";

import { IPhaseStrategy } from "../iphase-strategy";
import { PickUpGame } from "../../pick-up-game";
import { PickPlayerPugPhase } from "./pick-player-pug-phase";
import { BasePugPhaseStrategy } from "../base-pug-phase.strategy";
import { PickPlayerPhaseComponent } from "./pick-player-phase.component";
import { Localization } from "../../../common/localization/localization";

export class PickPlayerPhaseStrategy extends BasePugPhaseStrategy<PickPlayerPugPhase> implements IPhaseStrategy {

    constructor(phase: PickPlayerPugPhase) {
        super(phase);
    }

    public getPhaseActionMessage(pug: PickUpGame): Localization {
        return {
            key: "pug.phases.pick_player",
            data: pug.teams[this.phase.teamIndex]
        };
    }

    public getPhaseComponent(): Type<any> {
        return PickPlayerPhaseComponent;
    }
}
