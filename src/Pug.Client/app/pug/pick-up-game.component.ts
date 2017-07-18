import { Component, OnInit } from "@angular/core";

import { PickUpGameService } from "./pick-up-game.service";
import { PickUpGame } from "./pick-up-game";
import { Player } from "./players/player";
import { PhaseService } from "./phases/phase.service";

@Component({
    templateUrl: "app/pug/pick-up-game.component.html",
    styleUrls: ["app/pug/pick-up-game.component.css"]
})
export class PickUpGameComponent implements OnInit {

    public pug: PickUpGame;
    public phaseString: string = "";

    constructor(private pickUpGameService: PickUpGameService,
                private phaseService: PhaseService) { }

    public ngOnInit(): void {
        this.phaseService.currentPhase.subscribe((phaseStrategy) => {
            phaseStrategy.getPhaseActionMessage(this.pug).subscribe((phaseString) => {
                this.phaseString = phaseString;
            });
        });

        this.pickUpGameService.getPug().subscribe((pug) => {
            this.pug = pug;

            this.phaseService.setCurrentPhase(pug.currentPhase);
        });
    }

    public onPlayerPicked(player: Player) {
        alert(`${player.name} was picked!`);
    }
}
