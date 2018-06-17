import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { PickUpGame } from "./pick-up-game";
import { PhaseService } from "./phases/phase.service";
import { RequestService } from "../common/request.service";

@Injectable()
export class PickUpGameService {

    constructor(private requestService: RequestService,
                private phaseService: PhaseService) { }

    public getPug(): Observable<PickUpGame> {
        return this.requestService.get<PickUpGame>(`pug/5993a9e08e45e9871eec42df`)
                                  .pipe(tap(pug => this.phaseService.setCurrentPhase(pug.currentPhase)));
    }

}
