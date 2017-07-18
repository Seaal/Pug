import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Player } from "../player";

@Component({
    selector: "pug-player-picker",
    templateUrl: "app/pug/players/player-picker/player-picker.component.html"
})
export class PlayerPickerComponent {
    @Input() public players: Player[];

    @Output() public playerPicked: EventEmitter<Player> = new EventEmitter<Player>();

    public onPlayerSelected(player: Player) {
        this.playerPicked.emit(player);
    }
}
