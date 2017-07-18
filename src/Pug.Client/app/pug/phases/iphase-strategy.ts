import { PickUpGame } from "../pick-up-game";
import { Observable } from "rxjs/Observable";

export interface IPhaseStrategy {
    getPhaseActionMessage(pug: PickUpGame): Observable<string>;
}
