import { Component, Input } from "@angular/core";
import { Team } from "./team";

@Component({
    moduleId: module.id,
    selector: "pug-team",
    templateUrl: "team.component.html",
    styleUrls: ["team.component.css"]
})
export class TeamComponent {

    @Input() public team: Team;

}
