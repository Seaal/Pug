import { Component, OnInit } from "@angular/core";

import { PickUpGameService } from "./pick-up-game.service";
import { PickUpGame } from "./pick-up-game";
import { Player } from "./players/player";
import { PhaseService } from "./phases/phase.service";
import { IPhaseStrategy } from "./phases/iphase-strategy";
import { ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "app/pug/pick-up-game.component.html",
    styleUrls: ["app/pug/pick-up-game.component.css"]
})
export class PickUpGameComponent implements OnInit {

    public pug: PickUpGame;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.pug = this.route.snapshot.data["pug"];
    }

    public onPlayerPicked(player: Player) {
        alert(`${player.name} was picked!`);
    }
}
