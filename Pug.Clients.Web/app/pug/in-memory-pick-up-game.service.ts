import { Injectable, Inject, forwardRef } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

import { PickUpGame } from "./pick-up-game";
import { PhaseService } from "./phases/phase.service";
import { PugPhaseType } from "./phases/pug-phase-type";
import { Player } from "./player";

@Injectable()
export class InMemoryPickUpGameService {

    private pug: PickUpGame;

    constructor(private phaseService: PhaseService) {
        this.phaseService.setPickUpGameService(this as any);
    }

    public getPug(): Observable<PickUpGame> {
        const expiryTime = new Date();

        expiryTime.setSeconds(expiryTime.getSeconds() + 30);

        this.pug = {
            id: "abc",
            path: ["ctfpug", "whoracle"],
            currentPhase: {
                type: PugPhaseType.PickPlayer,
                teamIndex: 0,
                expiry: expiryTime
            },
            teams: [
                {
                    name: "Red",
                    captain: {
                        id: "1",
                        name: "Seaal"
                    },
                    players: []
                },
                {
                    name: "Blue",
                    captain: {
                        id: "2",
                        name: "Cyd"
                    },
                    players: []
                }
            ],
            pickablePlayers: [
                {
                    id: "3",
                    name: "Jenks"
                },
                {
                    id: "4",
                    name: "Alpha"
                },
                {
                    id: "5",
                    name: "Kimble"
                },
                {
                    id: "6",
                    name: "Max"
                },
                {
                    id: "7",
                    name: "Ski"
                },
                {
                    id: "8",
                    name: "Serk"
                },
                {
                    id: "9",
                    name: "Duo"
                },
                {
                    id: "10",
                    name: "Jaw4"
                }
            ]
        };

        return of(this.pug)
            .pipe(tap(pug => this.phaseService.setCurrentPhase(pug.currentPhase)));
    }

    public pickPlayer(player: Player): Observable<void> {
        const teamPicking = this.pug.teams[this.pug.currentPhase.teamIndex];

        const playerIndex = this.pug.pickablePlayers.indexOf(player);

        this.pug.pickablePlayers.splice(playerIndex, 1);

        teamPicking.players.push(player);

        const expiryTime = new Date();

        expiryTime.setSeconds(expiryTime.getSeconds() + 30);

        const currentPhase = {
            type: PugPhaseType.PickPlayer,
            expiry: expiryTime,
            teamIndex: this.pug.currentPhase.teamIndex === 0 ? 1 : 0
        };

        this.pug.currentPhase = currentPhase;

        this.phaseService.setCurrentPhase(currentPhase);

        return of();
    }
}
