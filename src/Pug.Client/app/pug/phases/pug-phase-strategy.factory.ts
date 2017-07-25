import { Injectable } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";

import { PugPhaseType } from "./pug-phase-type";
import { IPhaseStrategy } from "./iphase-strategy";
import { PickPlayerPhaseStrategy } from "./pick-player/pick-player-phase.strategy";
import { PugPhase } from "./pug-phase";
import { PickPlayerPugPhase } from "./pick-player/pick-player-pug-phase";

@Injectable()
export class PugPhaseStrategyFactory {

    constructor(private translateService: TranslateService) { }

    public make(phase: PugPhase): IPhaseStrategy {
        switch (phase.type) {
            case PugPhaseType.PickPlayer:
                return new PickPlayerPhaseStrategy(phase as PickPlayerPugPhase, this.translateService);
            default:
                throw Error("Phase Type is not supported");
        }
    }

}
