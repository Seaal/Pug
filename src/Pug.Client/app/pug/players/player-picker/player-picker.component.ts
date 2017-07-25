import { Component, Input } from "@angular/core";

import { Player } from "../player";
import { IPhaseComponent } from "../../phases/iphase-component";
import { PickUpGame } from "../../pick-up-game";

@Component({
    templateUrl: "app/pug/players/player-picker/player-picker.component.html"
})
export class PlayerPickerComponent implements IPhaseComponent {

    @Input() public pug: PickUpGame;

    public onPlayerSelected(player: Player) {
        alert(player.name);
    }
}
