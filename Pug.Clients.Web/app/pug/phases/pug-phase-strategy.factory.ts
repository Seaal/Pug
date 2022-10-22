import { Injectable } from "@angular/core";

import { PugPhaseType } from "./pug-phase-type";
import { IPhaseStrategy } from "./iphase-strategy";
import { PickPlayerPhaseStrategy } from "./pick-player/pick-player-phase.strategy";
import { PugPhase } from "./pug-phase";
import { PickUpGameService } from "../pick-up-game.service";

@Injectable()
export class PugPhaseStrategyFactory {

    public make(phase: PugPhase, pickUpGameService: PickUpGameService): IPhaseStrategy {
        switch (phase.type) {
            case PugPhaseType.PickPlayer:
                return new PickPlayerPhaseStrategy(phase, pickUpGameService);
            default:
                throw Error("Phase Type is not supported");
        }
    }

}
