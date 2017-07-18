import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Player } from "./players/player";
import { PickUpGame } from "./pick-up-game";

@Injectable()
export class PickUpGameService {

    public getPug(): Observable<PickUpGame> {
        return Observable.of({
            pickablePlayers: [
                { id: "1", name: "Dave" },
                { id: "2", name: "Mercer" },
                { id: "3", name: "Onasi" },
                { id: "4", name: "Alpha" }
            ],
            currentPhase: {
                type: 1,
                expiry: "2017-07-14T23:30",
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
        });
    }

}
