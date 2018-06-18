import { Component, Input, OnInit } from "@angular/core";
import { PickUpGame } from "../../pick-up-game";
import { PhaseService } from "../phase.service";
import { Localization } from "../../../common/localization/localization";

@Component({
    moduleId: module.id,
    selector: "pug-phase-title",
    templateUrl: "phase-title.component.html"
})
export class PhaseTitleComponent implements OnInit {

    @Input() public pug: PickUpGame;

    public title: Localization;
    public timeRemaining: number;

    constructor(private phaseService: PhaseService) { }

    public ngOnInit(): void {

        this.phaseService.currentPhase.subscribe(phaseStrategy =>
            this.title = phaseStrategy.getPhaseActionMessage(this.pug)
        );

        this.phaseService.phaseExpiry.subscribe(timeRemaining =>
            this.timeRemaining = timeRemaining
        );
    }
}
