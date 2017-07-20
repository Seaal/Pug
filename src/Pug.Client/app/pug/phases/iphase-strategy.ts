import { PickUpGame } from "../pick-up-game";
import { Observable } from "rxjs/Observable";
import { IBasePugPhaseStrategy } from "./ibase-pug-phase-strategy";

export interface IPhaseStrategy extends IBasePugPhaseStrategy {
    getPhaseActionMessage(pug: PickUpGame): Observable<string>;
}
