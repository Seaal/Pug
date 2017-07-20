import { Injectable } from "@angular/core";
import { PugPhaseType } from "./pug-phase-type";
import { IPhaseStrategy } from "./iphase-strategy";
import { PickPlayerPhaseStrategy } from "./pick-player-phase.strategy";
import { PugPhase } from "./pug-phase";
import { PickPlayerPugPhase } from "./pick-player-pug-phase";
import { TranslateService } from "@ngx-translate/core";

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
