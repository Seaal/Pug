import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Player } from "./player";
import { PickUpGame } from "./pick-up-game";
import { PhaseService } from "./phases/phase.service";
import { RequestService } from "../common/request.service";

@Injectable()
export class PickUpGameService {

    constructor(private requestService: RequestService,
                private phaseService: PhaseService) { }

    public getPug(): Observable<PickUpGame> {
        return this.requestService.get<PickUpGame>(`pug/1`).do((pug) => {
            this.phaseService.setCurrentPhase(pug.currentPhase);
        });
    }

}
