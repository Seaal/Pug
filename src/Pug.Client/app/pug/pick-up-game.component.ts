import { Component, OnInit } from "@angular/core";

import { PickUpGameService } from "./pick-up-game.service";
import { Player } from "./players/player";

@Component({
    templateUrl: "app/pug/pick-up-game.component.html",
    styleUrls: ["app/pug/pick-up-game.component.css"]
})
export class PickUpGameComponent implements OnInit {

    public players: Player[];

    constructor(private pickUpGameService: PickUpGameService) { }

    public ngOnInit(): void {
        this.pickUpGameService.getPlayers().subscribe((players) => {
            this.players = players;
        });
    }

    public onPlayerPicked(player: Player) {
        alert(`${player.name} was picked!`);
    }
}
