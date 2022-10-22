import { Component, Input } from "@angular/core";

import { IPhaseComponent } from "../iphase-component";
import { PickUpGame } from "../../pick-up-game";
import { Player } from "../../player";
import { PickPlayerPhaseStrategy } from "./pick-player-phase.strategy";

@Component({
    moduleId: module.id,
    templateUrl: "pick-player-phase.component.html"
})
export class PickPlayerPhaseComponent implements IPhaseComponent {

    @Input() public pug: PickUpGame;
    @Input() public phaseStrategy: PickPlayerPhaseStrategy;

    public onPlayerSelected(player: Player) {
        this.phaseStrategy.pickPlayer(player);
    }
}
