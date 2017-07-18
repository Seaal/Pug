import { IPhaseStrategy } from "./iphase-strategy";
import { PickUpGame } from "../pick-up-game";
import { PickPlayerPugPhase } from "./pick-player-pug-phase";
import { Observable } from "rxjs/Observable";

export class PickPlayerPhaseStrategy implements IPhaseStrategy {

    constructor(private phase: PickPlayerPugPhase) { }

    public getPhaseActionMessage(pug: PickUpGame): Observable<string> {
        return Observable.of(pug.teams[this.phase.teamIndex].name);
    }
}
