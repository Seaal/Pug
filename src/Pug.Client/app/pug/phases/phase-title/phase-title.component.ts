import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { IPhaseStrategy } from "../iphase-strategy";
import { PickUpGame } from "../../pick-up-game";
import { PhaseService } from "../phase.service";

@Component({
    selector: "pug-phase-title",
    templateUrl: "app/pug/phases/phase-title/phase-title.component.html"
})
export class PhaseTitleComponent implements OnInit {

    @Input() public pug: PickUpGame;

    public title: string;
    public timeRemaining: number;

    constructor(private phaseService: PhaseService) { }

    public ngOnInit(): void {

        this.phaseService.currentPhase.subscribe((phaseStrategy) =>
            phaseStrategy.getPhaseActionMessage(this.pug).subscribe((title) => this.title = title)
        );

        this.phaseService.phaseExpiry.subscribe((timeRemaining) =>
            this.timeRemaining = timeRemaining
        );
    }
}
