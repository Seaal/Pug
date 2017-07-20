import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Player } from "./players/player";
import { PickUpGame } from "./pick-up-game";
import { PhaseService } from "./phases/phase.service";

@Injectable()
export class PickUpGameService {

    constructor(private phaseService: PhaseService) { }

    public getPug(): Observable<PickUpGame> {
        const pug = {
            id: 12345,
            path: ["Jedi Academy", "CTF Pug", "europug"],
            pickablePlayers: [
                { id: "1", name: "Dave" },
                { id: "2", name: "Mercer" },
                { id: "3", name: "Onasi" },
                { id: "4", name: "Alpha" }
            ],
            currentPhase: {
                type: 1,
                expiry: moment().add(31, "seconds").toISOString(),
                teamIndex: 0
            },
            teams: [
                {
                    captain: {
                        id: "5", name: "Seaal"
                    },
                    players: [{
                        id: "5", name: "Seaal"
                    }],
                    name: "Blue"
                },
                {
                    captain: {
                        id: "6", name: "Kimble"
                    },
                    players: [{
                        id: "6", name: "Kimble"
                    }],
                    name: "Red"
                }
            ]
        };

        this.phaseService.setCurrentPhase(pug.currentPhase);

        return Observable.of(pug);
    }

}
