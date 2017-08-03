import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Player } from "../../../player";

@Component({
    moduleId: module.id,
    selector: "pug-player-item",
    templateUrl: "player-item.component.html",
    styleUrls: ["player-item.component.css"]
})
export class PlayerItemComponent {
    @Input() public player: Player;

    @Output() public select: EventEmitter<Player> = new EventEmitter<Player>();

    public selectPlayer() {
        this.select.emit(this.player);
    }
}
