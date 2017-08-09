import { Component, Input } from "@angular/core";

import { IPhaseComponent } from "../iphase-component";
import { PickUpGame } from "../../pick-up-game";
import { Player } from "../../player";

@Component({
    moduleId: module.id,
    templateUrl: "pick-player-phase.component.html"
})
export class PickPlayerPhaseComponent implements IPhaseComponent {

    @Input() public pug: PickUpGame;

    public onPlayerSelected(player: Player) {
        alert(player.name);
    }
}
