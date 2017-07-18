import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Player } from "../player";

@Component({
    selector: "pug-player-item",
    templateUrl: "app/pug/players/player-item/player-item.component.html",
    styleUrls: ["app/pug/players/player-item/player-item.component.css"]
})
export class PlayerItemComponent {
    @Input() public player: Player;

    @Output() public select: EventEmitter<Player> = new EventEmitter<Player>();

    public selectPlayer() {
        this.select.emit(this.player);
    }
}
