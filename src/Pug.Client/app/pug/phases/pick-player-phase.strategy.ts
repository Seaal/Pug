import { IPhaseStrategy } from "./iphase-strategy";
import { PickUpGame } from "../pick-up-game";
import { PickPlayerPugPhase } from "./pick-player-pug-phase";
import { Observable } from "rxjs/Observable";
import { TranslateService } from "@ngx-translate/core";
import { BasePugPhaseStrategy } from "./base-pug-phase.strategy";

export class PickPlayerPhaseStrategy extends BasePugPhaseStrategy<PickPlayerPugPhase> implements IPhaseStrategy {

    constructor(phase: PickPlayerPugPhase,
                private translateService: TranslateService) {
        super(phase);
    }

    public getPhaseActionMessage(pug: PickUpGame): Observable<string> {
        return this.translateService.get("pug.phases.pick_player", pug.teams[this.phase.teamIndex]);
    }
}
