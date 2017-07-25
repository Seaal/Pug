import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { PickUpGame } from "./pick-up-game";

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
}
