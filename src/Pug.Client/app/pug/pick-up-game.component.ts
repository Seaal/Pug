import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { PickUpGame } from "./pick-up-game";

@Component({
    moduleId: module.id,
    templateUrl: "pick-up-game.component.html",
    styleUrls: ["pick-up-game.component.css"]
})
export class PickUpGameComponent implements OnInit {

    public pug: PickUpGame;

    constructor(private route: ActivatedRoute) { }

    public ngOnInit(): void {
        this.pug = this.route.snapshot.data["pug"];
    }
}
